import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { lastValueFrom } from 'rxjs';
import { AuthorModel } from 'src/app/models/author.model';
import { ComicModel } from 'src/app/models/comic.model';
import { AuthorService } from 'src/app/services/author.service';
import { GenreService } from 'src/app/services/genre.service';
import { UploadService } from 'src/app/services/upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-add-comic-page',
  templateUrl: './admin-add-comic-page.component.html',
  styleUrls: ['./admin-add-comic-page.component.scss']
})
export class AdminAddComicPageComponent implements OnInit {
  @ViewChild('genreMultiSelect') genreMultiSelect: any;

  newComic: ComicModel = new ComicModel();
  imageCover?: File;
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
    idField: 'item_id',
    textField: 'item_text',
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
    private uploadService: UploadService) { }

  ngOnInit(): void {
    this.genreService.getAll().subscribe(data => {
      data.forEach(genre => {
        this.dropdownList.push(new Object({ item_id: genre.id, item_text: genre.name }));
      });

      this.genreMultiSelect.data = this.dropdownList;
    });
  }

  onImageSelected(event: any): void {
    this.imageCover = event.target.files[0];

    if (this.imageCover) {
      if ((this.imageCover.size / 1024 / 1024) > 2) {
        Swal.fire(
          'Kích thước quá lớn!',
          'Kích thước ảnh tối đa cho phép là 2MB',
          'error'
        );
        return;
      }

      const wrapper = this.elementRef.nativeElement.querySelector('.upload-cover') as HTMLElement;
      const placeHolder = wrapper.querySelector('.placeholder') as HTMLElement;
      const img = wrapper.querySelector('.cover') as HTMLImageElement;

      wrapper.style.padding = '0';
      wrapper.style.borderWidth = '0';

      placeHolder.style.display = 'none';

      img.onload = () => {
        URL.revokeObjectURL(img.src);  // no longer needed, free memory
      }
      img.src = URL.createObjectURL(this.imageCover); // set src to blob url
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
    }
  }

  onItemSelect(item: any) {
    console.log(item);
  }

  onSelectAll(items: any) {
    console.log(items);
  }

  goBack(): void {

  }

  async postComic(): Promise<void> {
    if (this.imageCover) {
      let author = await lastValueFrom(this.authorService.getByName(this.authorName));

      if (author.id != 0) {
        this.newComic.authorId = author.id;
      }
      else {
        let newAuthor = new AuthorModel();
        newAuthor.name = this.authorName;

        author = await lastValueFrom(this.authorService.add(newAuthor));
        this.newComic.authorId = author.id;
      }

      console.log(this.newComic);

      this.uploadService.upload(this.imageCover).subscribe(data => console.log(data));
    }
  }
}
