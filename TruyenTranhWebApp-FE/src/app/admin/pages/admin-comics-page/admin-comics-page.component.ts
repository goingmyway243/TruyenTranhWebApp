import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom, map } from 'rxjs';
import { ComicModel, StatusType } from 'src/app/models/comic.model';
import { AuthorService } from 'src/app/services/author.service';
import { ComicService } from 'src/app/services/comic.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-comics-page',
  templateUrl: './admin-comics-page.component.html',
  styleUrls: ['./admin-comics-page.component.scss']
})
export class AdminComicsPageComponent implements OnInit {
  listComics: ComicModel[] = [];
  isCoverLoaded: boolean = false;

  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private comicService: ComicService,
    private authorService: AuthorService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.getAllComics();
  }

  async getAllComics(): Promise<void> {
    this.listComics = await lastValueFrom(this.comicService.getAll());
    this.listComics.forEach(async comic => {
      comic.statusString = this.getComicStatusString(comic);
      comic.statusClass = this.getComicStatusClass(comic);
      comic.author = await lastValueFrom(this.authorService.getById(comic.authorId));
      comic.user = await lastValueFrom(this.userService.getById(comic.userId));
    });
  }

  onRowDataHover(comic: ComicModel): void {
    comic = Object.assign(new ComicModel(), comic);

    const placeHolder = this.elementRef.nativeElement.querySelector('.placeholder') as HTMLElement;

    const wrapper = this.elementRef.nativeElement.querySelector('.preview .cover') as HTMLElement;
    const img = wrapper.querySelector('img') as HTMLImageElement;

    placeHolder.setAttribute('hidden', '');
    wrapper.removeAttribute('hidden');

    img.src = comic.getComicCover();
  }

  onTableMouseLeave(): void {
    const placeHolder = this.elementRef.nativeElement.querySelector('.placeholder') as HTMLElement;
    const wrapper = this.elementRef.nativeElement.querySelector('.preview .cover') as HTMLElement;

    wrapper.setAttribute('hidden', '');
    placeHolder.removeAttribute('hidden');
  }

  addComic(): void {
    this.router.navigate(['quan-tri/them-truyen']);
  }

  editComic(id: number): void {
    this.router.navigate([`quan-tri/cap-nhat-truyen/${id}`]);
  }

  removeComic(id: number): void {
    Swal.fire({
      icon: 'question',
      title: 'Xóa',
      text: `Bạn có chắc muốn xóa truyện có mã '${id}'?`,
      showCancelButton: true,
      showConfirmButton: true,
      focusCancel: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Không',
      confirmButtonColor: 'var(--color-primary)',
      cancelButtonColor: 'var(--color-danger)'
    }).then(result => {
      if (result.isConfirmed) {
        this.comicService.delete(id).subscribe(
          data => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Xóa thành công!',
              showConfirmButton: false,
              timer: 1000
            }).then(result => {
              this.getAllComics();
            });
          },
          error => {
            console.log(error);
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Có lỗi xảy ra!',
              showConfirmButton: false,
              timer: 1500
            });
          });
      }
    });
  }

  getComicStatusString(comic: ComicModel): string {
    let result = '';

    switch (comic.status.toString()) {
      case StatusType[StatusType.PENDING]: {
        result = 'Chờ duyệt';
        break;
      }
      case StatusType[StatusType.PUBLISH]: {
        result = 'Công khai';
        break;
      }
      case StatusType[StatusType.UNPUBLISH]: {
        result = 'Ẩn';
        break;
      }
      case StatusType[StatusType.REJECTED]: {
        result = 'Không duyệt';
        break;
      }
    }

    return result;
  }

  getComicStatusClass(comic: ComicModel): string {
    let result = '';

    switch (comic.status.toString()) {
      case StatusType[StatusType.PENDING]: {
        result = 'pending';
        break;
      }
      case StatusType[StatusType.PUBLISH]: {
        result = 'publish';
        break;
      }
      case StatusType[StatusType.UNPUBLISH]: {
        result = 'unpublish';
        break;
      }
      case StatusType[StatusType.REJECTED]: {
        result = 'reject';
        break;
      }
    }

    return result;
  }
}
