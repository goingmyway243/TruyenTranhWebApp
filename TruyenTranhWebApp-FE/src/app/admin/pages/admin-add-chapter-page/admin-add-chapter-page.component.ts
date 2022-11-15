import { Location } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChapterModel } from 'src/app/models/chapter.model';
import { ContentModel } from 'src/app/models/content.model';
import { ContentService } from 'src/app/services/content.service';
import Swal from 'sweetalert2';
import { AdminComponent } from '../../admin.component';

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
    private location: Location,
    private elementRef: ElementRef,
    private contentService: ContentService) { }

  ngOnInit(): void {
    if (AdminComponent.draftChapter) {
      this.newChapter = AdminComponent.draftChapter;
      this.listImages = this.newChapter.contentImages;

      if (this.newChapter.id != 0) {
        this.contentService.getByChapterId(this.newChapter.id).subscribe(data => {
          this.newChapter.contents = data;
          this.newChapter.contents.forEach(content => this.loadImageFromContent(content, AdminComponent.draftComic!.id))
        });
      }

      this.listImages.forEach(image => this.loadImage(image));
    }
  }

  goBack(): void {
    this.location.back();
  }

  async postChapter(): Promise<void> {
    if (this.listImages.length > 0 && AdminComponent.draftComic) {
      let duplicateIndex = -1;
      AdminComponent.draftComic.chapters.forEach(chapter => {
        if (this.newChapter.chapterIndex === chapter.chapterIndex) {
          duplicateIndex = chapter.chapterIndex;
          return;
        }
      });

      if (duplicateIndex === -1) {
        this.newChapter.contentImages = this.listImages;
        AdminComponent.draftComic.chapters.push(this.newChapter);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Thêm chương truyện thành công!',
          showConfirmButton: false,
          timer: 1000
        }).then(result => {
          this.goBack();
        });
      }
      else {
        Swal.fire(
          `Không hợp lệ`,
          `Chương ${duplicateIndex} đã tồn tại!`,
          'error'
        );
      }
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
        this.loadImage(image);
      }
    }

    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 55);
  }

  loadImage(image: File): void {
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

  loadImageFromContent(content: ContentModel, comicId: number) {
    content = Object.assign(new ContentModel(), content);

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
      let index = content.contentIndex;
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
    img.src = content.getContentImage(comicId); // set src to blob url

    container.appendChild(img);
    container.appendChild(removeBtn);

    wrapper.appendChild(container);
  }
}
