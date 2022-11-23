import { Component, ElementRef, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { ComicService } from 'src/app/services/comic.service';
import { UploadService } from 'src/app/services/upload.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { MainComponent } from '../../main.component';

@Component({
  selector: 'app-my-profile-page',
  templateUrl: './my-profile-page.component.html',
  styleUrls: ['./my-profile-page.component.scss']
})
export class MyProfilePageComponent implements OnInit {
  user: UserModel = new UserModel();
  comicCount: number = 0;
  draftUserName: string = '';

  avatarImage?: File;
  isEdit: boolean = false;

  constructor(
    private elementRef: ElementRef,
    private userService: UserService,
    private comicService: ComicService,
    private uploadService: UploadService) { }

  ngOnInit(): void {
    let userId = localStorage.getItem('authorizeToken');
    if (userId) {
      this.userService.getById(+userId).subscribe(data => {
        this.user = Object.assign(new UserModel(), data);
        this.draftUserName = this.user.name;
        this.comicService.getByUserIdOrderByTime(this.user.id).subscribe(data => {
          this.comicCount = data.length;
        });
      });
    }
  }

  onImageSelected(event: any): void {
    this.avatarImage = event.target.files[0];

    if (this.avatarImage) {
      if ((this.avatarImage.size / 1024 / 1024) > 2) {
        Swal.fire(
          'Kích thước quá lớn!',
          'Kích thước ảnh tối đa cho phép là 2MB',
          'error'
        );

        this.avatarImage = undefined;
        return;
      }

      const img = this.elementRef.nativeElement.querySelector('.avatar img') as HTMLImageElement;

      img.onload = () => {
        URL.revokeObjectURL(img.src);  // no longer needed, free memory
      }

      img.src = URL.createObjectURL(this.avatarImage); // set src to blob url
    }
  }

  editName(): void {
    this.isEdit = true;
    this.draftUserName = this.user.name;

    const viewGroup = this.elementRef.nativeElement.querySelector('.view') as HTMLElement;
    const editGroup = this.elementRef.nativeElement.querySelector('.edit') as HTMLElement;
    const input = editGroup.querySelector('input') as HTMLInputElement;

    viewGroup.setAttribute('hidden', '');
    editGroup.removeAttribute('hidden');
    input.focus();
  }

  cancelEdit(isFinish?: boolean): void {
    this.avatarImage = undefined;
    this.isEdit = false;

    const img = this.elementRef.nativeElement.querySelector('.avatar img') as HTMLImageElement;
    const viewGroup = this.elementRef.nativeElement.querySelector('.view') as HTMLElement;
    const editGroup = this.elementRef.nativeElement.querySelector('.edit') as HTMLElement;

    viewGroup.removeAttribute('hidden');
    editGroup.setAttribute('hidden', '');

    if (!isFinish)
      img.src = this.user.getAvatar(); // set src to blob url
  }

  async updateUserInfo(): Promise<void> {
    if (!this.draftUserName) {
      Swal.fire(
        'Lỗi!',
        'Vui lòng nhập tên người dùng',
        'error'
      );
      return;
    }

    if (this.user.name != this.draftUserName) {
      this.user.name = this.draftUserName;
      await lastValueFrom(this.userService.update(this.user));
    }

    if (this.avatarImage) {
      await lastValueFrom(this.uploadService.upload(this.avatarImage, `${this.user.id}.jpg`));
    }

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Cập nhật thông tin thành công!',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      this.cancelEdit(true);
    });
  }
}
