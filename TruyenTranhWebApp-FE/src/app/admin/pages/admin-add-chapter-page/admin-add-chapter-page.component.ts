import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ChapterModel } from 'src/app/models/chapter.model';
import { ChapterService } from 'src/app/services/chapter.service';
import { UploadService } from 'src/app/services/upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-add-chapter-page',
  templateUrl: './admin-add-chapter-page.component.html',
  styleUrls: ['./admin-add-chapter-page.component.scss']
})
export class AdminAddChapterPageComponent implements OnInit {
  newChapter: ChapterModel = new ChapterModel;

  addForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    index: new FormControl(1)
  });

  listImages: File[] = [];

  constructor(
    private router: Router,
    private elementRef: ElementRef,
    private chapterService: ChapterService,
    private uploadService: UploadService) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.router.navigate(['quan-tri/them-truyen']);
  }

  async postChapter(): Promise<void> {
    if (this.listImages.length > 0) {
      // let autitIndex = await lastValueFrom(this.chapterService.getByIndex(this.newChapter.chapterIndex));

      this.newChapter.comicId = this.listImages.length;

      console.log(this.newChapter);
      // this.newChapter = await lastValueFrom(this.chapterService.add(this.newChapter));

      this.listImages.forEach((image, index) => {

        // this.uploadService.upload(image, index +'.jpg').subscribe(data => {
        //   Swal.fire({
        //     position: 'top-end',
        //     icon: 'success',
        //     title: 'Thêm truyện thành công!',
        //     showConfirmButton: false,
        //     timer: 1500
        //   }).then(result => {
        //     this.goBack();
        //   });
        // });
      });
    }
  }

  onImageSelected(event: any): void {
    let oldLength = this.listImages.length;

    this.listImages.push(...event.target.files);

    for (let i = oldLength; i < this.listImages.length; i++) {
      let image = this.listImages[i];

      if ((image.size / 1024 / 1024) > 2) {
        this.listImages.splice(this.listImages.indexOf(image), 1);

        Swal.fire(
          'Có ảnh có kích thước quá lớn!',
          'Kích thước ảnh tối đa cho phép là 2MB',
          'error'
        );
      }
      else {
        const wrapper = this.elementRef.nativeElement.querySelector('.add-content-group .contents') as HTMLElement;

        const container = document.createElement('div');
        container.style.position = 'relative';

        const removeBtn = document.createElement('span');
        removeBtn.innerHTML = '<i class="uil uil-multiply"></i>';
        removeBtn.style.position = 'absolute';
        removeBtn.style.top = '0.5rem';
        removeBtn.style.right = '0.5rem';
        removeBtn.style.fontSize = '2rem';
        removeBtn.style.color = 'var(--color-danger)';
        removeBtn.style.fontWeight = '500';
        removeBtn.style.cursor = 'pointer';
        removeBtn.addEventListener('click', () => {
          let index = this.listImages.indexOf(image);
          this.listImages.splice(index, 1);
          container.remove();
        });

        const img = document.createElement('img');
        img.addEventListener('mouseenter', () => {
          img.style.border = '3px solid var(--color-primary)';
        });
        img.addEventListener('mouseleave', () => {
          img.style.borderWidth = '0';
        });
        img.onload = () => {
          URL.revokeObjectURL(img.src);  // no longer needed, free memory
        }
        img.src = URL.createObjectURL(image); // set src to blob url

        container.appendChild(img);
        container.appendChild(removeBtn);

        wrapper.appendChild(container);
      }
    }
  }
}
