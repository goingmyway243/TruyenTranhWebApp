import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ComicModel, StatusType } from 'src/app/models/comic.model';
import { StatisticModel } from 'src/app/models/statistic.model';
import { ComicService } from 'src/app/services/comic.service';
import { StatisticService } from 'src/app/services/statistic.service';
import { UploadService } from 'src/app/services/upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-dashboard-page',
  templateUrl: './admin-dashboard-page.component.html',
  styleUrls: ['./admin-dashboard-page.component.scss']
})
export class AdminDashboardPageComponent implements OnInit {
  statistic: StatisticModel = new StatisticModel();
  listComics: ComicModel[] = [];

  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private statisticService: StatisticService,
    private comicService: ComicService,
    private uploadService: UploadService) { }

  ngOnInit(): void {
    this.statisticService.getReport().subscribe(data => this.statistic = data);
    this.getNewComics();
  }

  async getNewComics(): Promise<void> {
    this.comicService.getAllOrderByTime().subscribe(data => {
      this.listComics = data.slice(0, 5);
      this.listComics.forEach(async comic => {
        comic.statusString = this.getComicStatusString(comic);
        comic.statusClass = this.getComicStatusClass(comic);
      });
    });
  }

  onTableMouseLeave(): void {
    const placeHolder = this.elementRef.nativeElement.querySelector('.placeholder') as HTMLElement;
    const wrapper = this.elementRef.nativeElement.querySelector('.preview .cover') as HTMLElement;

    wrapper.setAttribute('hidden', '');
    placeHolder.removeAttribute('hidden');
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

  editComic(id: number): void {
    this.router.navigate([`quan-tri/cap-nhat-truyen/${id}`]);
  }

  removeComic(id: number): void {
    Swal.fire({
      icon: 'question',
      title: 'X??a',
      text: `B???n c?? ch???c mu???n x??a truy???n c?? m?? '${id}'?`,
      showCancelButton: true,
      showConfirmButton: true,
      focusCancel: true,
      confirmButtonText: 'X??a',
      cancelButtonText: 'Kh??ng',
      confirmButtonColor: 'var(--color-primary)',
      cancelButtonColor: 'var(--color-danger)'
    }).then(async result => {
      if (result.isConfirmed) {
        await lastValueFrom(this.comicService.delete(id));
        this.uploadService.deleteByPath(`${id}`).subscribe(
          data => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'X??a th??nh c??ng!',
              showConfirmButton: false,
              timer: 1000
            }).then(result => {
              this.getNewComics();
            });
          },
          error => {
            console.log(error);
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'C?? l???i x???y ra!',
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
        result = 'Ch??? duy???t';
        break;
      }
      case StatusType[StatusType.PUBLISH]: {
        result = 'Duy???t';
        break;
      }
      case StatusType[StatusType.UNPUBLISH]: {
        result = '???n';
        break;
      }
      case StatusType[StatusType.REJECTED]: {
        result = 'T??? ch???i';
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
