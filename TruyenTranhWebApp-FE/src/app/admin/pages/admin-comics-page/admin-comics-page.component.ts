import { Component, ElementRef, OnInit } from '@angular/core';
import { ComicModel } from 'src/app/models/comic.model';
import { ComicService } from 'src/app/services/comic.service';
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
    private comicService: ComicService) { }

  ngOnInit(): void {
    this.getAllComics();
  }

  getAllComics(): void {
    this.comicService.getAll().subscribe(data => this.listComics = data);
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
}
