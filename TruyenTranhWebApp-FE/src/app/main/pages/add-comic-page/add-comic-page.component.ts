import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { lastValueFrom } from 'rxjs';
import { AuthorModel } from 'src/app/models/author.model';
import { ChapterModel } from 'src/app/models/chapter.model';
import { ComicModel, StatusType } from 'src/app/models/comic.model';
import { ContentModel } from 'src/app/models/content.model';
import { GenreModel } from 'src/app/models/genre.model';
import { AuthorService } from 'src/app/services/author.service';
import { ChapterService } from 'src/app/services/chapter.service';
import { ComicService } from 'src/app/services/comic.service';
import { ContentService } from 'src/app/services/content.service';
import { GenreService } from 'src/app/services/genre.service';
import { UploadService } from 'src/app/services/upload.service';
import Swal from 'sweetalert2';
import { MainComponent } from '../../main.component';

@Component({
  selector: 'app-add-comic-page',
  templateUrl: './add-comic-page.component.html',
  styleUrls: ['./add-comic-page.component.scss']
})
export class AddComicPageComponent implements OnInit {
  @ViewChild('genreMultiSelect') genreMultiSelect: any;

  newComic: ComicModel = new ComicModel();
  coverImage?: File;
  authorName: string = '';
  editId?: number;

  addForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    genres: new FormControl([], this.multiSelectRequired()),
    description: new FormControl('')
  });

  dropdownList: GenreModel[] = [];
  selectedItems: GenreModel[] = [];
  dropdownSettings: IDropdownSettings = {
    idField: 'id',
    textField: 'name',
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
    private router: Router,
    private activeRoute: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('id');

    if (MainComponent.draftComic) {
      this.editId = MainComponent.draftComic.id;
      this.newComic = MainComponent.draftComic;
      this.coverImage = this.newComic.coverImage;
      this.selectedItems = this.newComic.genres;
      this.authorName = this.newComic.author!.name;
      this.loadCoverImage();
    }
    else if (id) {
      this.editId = +id;
      this.comicService.getById(this.editId).subscribe(data => {
        this.newComic = data;
        this.newComic.chapters = this.newComic.chapters.map(chapter => Object.assign(new ChapterModel(), chapter));
        this.newComic.chapters.sort((a, b) => a.chapterIndex - b.chapterIndex);
        this.authorName = this.newComic.author ? this.newComic.author.name : '';
        this.selectedItems = this.newComic.genres;
        this.loadCoverImage();
      });
    }

    this.genreService.getAll().subscribe(data => {
      this.dropdownList = data;
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
    if (this.coverImage || this.editId || MainComponent.draftComic?.id != 0) {
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

      if (this.coverImage) {
        img.src = URL.createObjectURL(this.coverImage); // set src to blob url
      } else {
        img.src = this.newComic.getComicCover(); // set src to blob url
      }
    }
  }

  onMultiSelectTouched(): void {
    this.addForm.get('genres')?.markAsTouched();
  }

  goBack(): void {
    MainComponent.draftComic = undefined;
    this.location.back();
  }

  navigateToAddChapter(chapter?: ChapterModel): void {
    MainComponent.draftComic = this.newComic;
    MainComponent.draftComic.coverImage = this.coverImage;
    MainComponent.draftComic.author = new AuthorModel();
    MainComponent.draftComic.author.name = this.authorName;
    MainComponent.draftComic.genres = this.selectedItems;

    MainComponent.draftChapter = chapter;

    this.router.navigate(['them-chuong']);
  }

  deleteChapter(chapter: ChapterModel): void {
    Swal.fire({
      icon: 'question',
      title: 'Xóa',
      text: `Bạn có chắc muốn xóa chương ${chapter.chapterIndex}?`,
      showCancelButton: true,
      showConfirmButton: true,
      focusCancel: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Không',
      confirmButtonColor: 'var(--color-primary)',
      cancelButtonColor: 'var(--color-danger)'
    }).then(result => {
      if (result.isConfirmed) {
        this.processDeleteChapter(chapter).then(() => console.log('success'));
      }
    });
  }

  async processDeleteChapter(chapter: ChapterModel): Promise<void> {
    let index = this.newComic.chapters.indexOf(chapter);
    this.newComic.chapters.splice(index, 1);

    if (chapter.id != 0) {
      for (let i = 0; i < chapter.contents.length; i++) {
        let content = chapter.contents[i];
        await lastValueFrom(
          this.uploadService
            .deleteByFolderWithFileName(this.newComic.id + '', content.id + '.jpg'));
      }

      this.chapterService.delete(chapter.id).subscribe(data => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Xóa chương truyện thành công!',
          showConfirmButton: false,
          timer: 1500
        });
      });
    }
  }

  async postComic(): Promise<void> {
    if (this.newComic.chapters.length == 0) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Vui lòng thêm ít nhất 1 chương!',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }

    if (this.addForm.valid) {
      if (this.editId) {
        this.updateComic();
      }
      else {
        this.addComic();
      }
    }
    else {
      this.addForm.markAllAsTouched();
    }
  }

  async addComic(): Promise<void> {
    if (!this.coverImage) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Vui lòng thêm bìa truyện!',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    else {
      this.toggleSpinner();

      this.newComic.status = StatusType.PENDING;

      this.newComic.author = await lastValueFrom(this.authorService.getByName(this.authorName));

      if (this.newComic.author.id == 0) {
        let newAuthor = new AuthorModel();
        newAuthor.name = this.authorName;

        this.newComic.author = await lastValueFrom(this.authorService.add(newAuthor));
      }

      this.newComic.genres = this.selectedItems;
      this.newComic.user = MainComponent.currentUser;

      let resultComic = await lastValueFrom(this.comicService.add(this.newComic));
      this.newComic.id = resultComic.id;

      let chapters = this.newComic.chapters;
      let resultChapters = await lastValueFrom(this.chapterService.addList(chapters, this.newComic.id));

      for (let i = 0; i < chapters.length; i++) {
        let chapter = chapters[i];
        chapter.id = resultChapters[i].id;

        for (let j = 0; j < chapter.contentImages.length; j++) {
          let image = chapter.contentImages[j];
          let content = new ContentModel();
          content.contentIndex = j;
          content.chapter = chapter;

          content = await lastValueFrom(this.contentService.add(content));
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

  async updateComic(): Promise<void> {
    this.toggleSpinner();

    this.newComic.author = await lastValueFrom(this.authorService.getByName(this.authorName));

    if (this.newComic.author.id == 0) {
      let newAuthor = new AuthorModel();
      newAuthor.name = this.authorName;

      this.newComic.author = await lastValueFrom(this.authorService.add(newAuthor));
    }

    this.newComic.genres = this.selectedItems;
    this.newComic.user = MainComponent.currentUser;

    await lastValueFrom(this.comicService.update(this.newComic));
    await lastValueFrom(this.chapterService.addList(this.newComic.chapters, this.newComic.id));

    this.toggleSpinner();

    if (this.coverImage) {
      this.uploadService.upload(this.coverImage, 'cover.jpg', this.newComic.id + '').subscribe(data => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Cập nhật truyện với bìa thành công!',
          showConfirmButton: false,
          timer: 1500
        }).then(result => {
          this.goBack();
        });
      });
    }
    else {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Cập nhật truyện thành công!',
        showConfirmButton: false,
        timer: 1500
      }).then(result => {
        this.goBack();
      });
    }
  }

  toggleSpinner(): void {
    let spinner = this.elementRef.nativeElement.querySelector('.spinner') as HTMLElement;
    spinner.classList.toggle('hidden');
  }

  multiSelectRequired(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value.length > 0 ? null : { multiRequired: true };
    };
  }
}
