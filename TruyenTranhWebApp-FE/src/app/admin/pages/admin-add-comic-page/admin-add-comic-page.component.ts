import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { MainComponent } from 'src/app/main/main.component';
import { AuthorModel } from 'src/app/models/author.model';
import { ChapterModel } from 'src/app/models/chapter.model';
import { ComicModel } from 'src/app/models/comic.model';
import { ContentModel } from 'src/app/models/content.model';
import { AuthorService } from 'src/app/services/author.service';
import { ChapterService } from 'src/app/services/chapter.service';
import { ComicService } from 'src/app/services/comic.service';
import { ContentService } from 'src/app/services/content.service';
import { GenreService } from 'src/app/services/genre.service';
import { UploadService } from 'src/app/services/upload.service';
import Swal from 'sweetalert2';
import { AdminComponent } from '../../admin.component';

@Component({
  selector: 'app-admin-add-comic-page',
  templateUrl: './admin-add-comic-page.component.html',
  styleUrls: ['./admin-add-comic-page.component.scss']
})
export class AdminAddComicPageComponent implements OnInit {
  @ViewChild('genreMultiSelect') genreMultiSelect: any;

  newComic: ComicModel = new ComicModel();
  coverImage?: File;
  authorName: string = '';

  addForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    genres: new FormControl([], Validators.required),
    description: new FormControl('', Validators.required)
  });

  dropdownList: any[] = [];
  selectedItems: any[] = [];
  dropdownSettings: IDropdownSettings = {
    idField: 'value',
    textField: 'text',
    singleSelection: false,
    allowSearchFilter: true,
    selectAllText: 'Chọn tất cả',
    unSelectAllText: 'Bỏ chọn tất cả',
    searchPlaceholderText: 'Tìm kiếm',
    noDataAvailablePlaceholderText: 'Không có thể loại',
    noFilteredDataAvailablePlaceholderText: 'Không tìm thấy thể loại'
  };

  constructor(
    private elementRef: ElementRef,
    private genreService: GenreService,
    private authorService: AuthorService,
    private comicService: ComicService,
    private chapterService: ChapterService,
    private contentService: ContentService,
    private uploadService: UploadService,
    private router: Router) { }

  ngOnInit(): void {
    if (AdminComponent.draftComic) {
      this.newComic = AdminComponent.draftComic;
      this.coverImage = this.newComic.coverImage;
      this.loadCoverImage();
    }

    this.genreService.getAll().subscribe(data => {
      data.forEach(genre => {
        this.dropdownList.push(new Object({ value: genre, text: genre.name }));
      });

      this.genreMultiSelect.data = this.dropdownList;
    });
  }

  onImageSelected(event: any): void {
    this.coverImage = event.target.files[0];

    if (this.coverImage) {
      if ((this.coverImage.size / 1024 / 1024) > 2) {
        Swal.fire(
          'Kích thước quá lớn!',
          'Kích thước ảnh tối đa cho phép là 2MB',
          'error'
        );
        return;
      }

      this.loadCoverImage();
    }
  }

  loadCoverImage(): void {
    if (this.coverImage) {
      const upload = this.elementRef.nativeElement.querySelector('.upload-cover') as HTMLElement;

      const placeHolder = upload.querySelector('.upload-cover .placeholder') as HTMLElement;

      const wrapper = upload.querySelector('.upload-cover .cover-wrapper') as HTMLElement;
      const img = wrapper.querySelector('.cover') as HTMLImageElement;

      upload.style.padding = '0';
      upload.style.borderWidth = '0';

      placeHolder.style.display = 'none';

      wrapper.style.width = '100%';
      wrapper.style.height = '100%';

      img.onload = () => {
        URL.revokeObjectURL(img.src);  // no longer needed, free memory
      }
      img.src = URL.createObjectURL(this.coverImage); // set src to blob url
    }
  }

  onItemSelect(item: any) {
  }

  onSelectAll(items: any) {
  }

  goBack(): void {
    AdminComponent.draftComic = undefined;
    this.router.navigate(['quan-tri/quan-ly-truyen']);
  }

  navigateToAddChapter(chapter?: ChapterModel): void {
    AdminComponent.draftComic = this.newComic;
    AdminComponent.draftComic.coverImage = this.coverImage;

    AdminComponent.draftChapter = chapter;

    this.router.navigate(['quan-tri/them-chuong']);
  }

  deleteChapter(chapter: ChapterModel): void {
    Swal.fire({
      icon: 'question',
      title: 'Xóa',
      text: 'Bạn có chắc muốn xóa?',
      showCancelButton: true,
      showConfirmButton: true,
      focusCancel: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Không',
      confirmButtonColor: 'var(--color-primary)',
      cancelButtonColor: 'var(--color-danger)'
    }).then(result => {
      if (result.isConfirmed) {
        let index = this.newComic.chapters.indexOf(chapter);
        this.newComic.chapters.splice(index, 1);
      }
    });
  }

  async postComic(): Promise<void> {
    if (this.coverImage && this.selectedItems.length > 0) {
      this.toggleSpinner();

      let author = await lastValueFrom(this.authorService.getByName(this.authorName));

      if (author.id !== 0) {
        this.newComic.authorId = author.id;
      }
      else {
        let newAuthor = new AuthorModel();
        newAuthor.name = this.authorName;

        author = await lastValueFrom(this.authorService.add(newAuthor));
        this.newComic.authorId = author.id;
      }

      let chapters = this.newComic.chapters;

      this.newComic.genres = this.selectedItems.map(item => item.value);
      this.newComic.userId = AdminComponent.currentUser!.id;

      this.newComic = await lastValueFrom(this.comicService.add(this.newComic));

      let result = await lastValueFrom(this.chapterService.addList(chapters, this.newComic.id));

      for (let i = 0; i < chapters.length; i++) {
        let chapter = chapters[i];
        chapter.id = result[i].id;

        for (let j = 0; j < chapter.contentImages.length; j++) {
          let image = chapter.contentImages[j];
          let content = new ContentModel();
          content.contentIndex = j;
          content.fileName = String(j).padStart(3, '0') + '.jpg';

          content = await lastValueFrom(this.contentService.add(content, chapter.id));
          await lastValueFrom(this.uploadService.upload(image, content.id + '.jpg', this.newComic.id + ''));
        }
      }

      this.toggleSpinner();

      this.uploadService.upload(this.coverImage, 'cover.jpg', this.newComic.id + '').subscribe(data => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Thêm truyện thành công!',
          showConfirmButton: false,
          timer: 1500
        }).then(result => {
          this.goBack();
        });
      });
    }
  }

  toggleSpinner(): void {
    let spinner = this.elementRef.nativeElement.querySelector('.spinner') as HTMLElement;
    spinner.classList.toggle('hidden');
  }
}
