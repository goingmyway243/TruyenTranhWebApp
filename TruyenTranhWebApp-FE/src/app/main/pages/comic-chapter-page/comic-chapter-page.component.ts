import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChapterModel } from 'src/app/models/chapter.model';
import { ComicModel } from 'src/app/models/comic.model';
import { ContentModel } from 'src/app/models/content.model';
import { ComicService } from 'src/app/services/comic.service';
import { ContentService } from 'src/app/services/content.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-comic-chapter-page',
  templateUrl: './comic-chapter-page.component.html',
  styleUrls: ['./comic-chapter-page.component.scss']
})
export class ComicChapterPageComponent implements OnInit {
  comicData: ComicModel = new ComicModel();
  chapterData: ChapterModel = new ChapterModel();
  listContents: ContentModel[] = [];
  updatedTime: string = '';

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private elementRef: ElementRef,
    private comicService: ComicService,
    private contentService: ContentService
  ) { }

  ngOnInit(): void {
    window.onscroll = () => this.scrollFunction();

    const comicId = this.activeRoute.snapshot.paramMap.get('id');
    const chapterIndex = this.activeRoute.snapshot.paramMap.get('chapterId');

    if (comicId && chapterIndex) {
      this.comicService.getById(+comicId).subscribe(data => {
        this.comicData = data;
        this.comicData.chapters = this.comicData.chapters
          .sort((a, b) => b.chapterIndex - a.chapterIndex)
          .map(chapter => Object.assign(new ChapterModel(), chapter));

        this.comicData.chapters.forEach(chapter => {
          if (chapter.chapterIndex == +chapterIndex) {
            this.chapterData = chapter;
          }
        });

        this.contentService.getByChapterId(this.chapterData.id).subscribe(data => {
          this.listContents = data;
          this.listContents = this.listContents.map(content => Object.assign(new ContentModel(), content));
        });

        this.updatedTime = Utils.getUpdatedDateTime(this.chapterData.createdTime);

        this.comicData.view++;
        this.comicService.update(this.comicData).subscribe();
      });
    }
    else {
      this.router.navigate(['']);
    }
  }

  nextChapter() {
    let currentIndex = this.comicData.chapters.indexOf(this.chapterData);
    const index = this.comicData.chapters[--currentIndex].chapterIndex;
    this.router
      .navigate([`../../chuong/${index}`], { relativeTo: this.activeRoute })
      .then(() => window.location.reload());;
  }

  previousChapter() {
    let currentIndex = this.comicData.chapters.indexOf(this.chapterData);
    const index = this.comicData.chapters[++currentIndex].chapterIndex;
    this.router
      .navigate([`../../chuong/${index}`], { relativeTo: this.activeRoute })
      .then(() => window.location.reload());;
  }

  navigateToChapterForSelect(event: any) {
    this.router
      .navigate([`../../chuong/${event.target.value}`], { relativeTo: this.activeRoute })
      .then(() => window.location.reload());
  }

  scrollFunction(): void {
    const topButton = this.elementRef.nativeElement.querySelector('.top-button') as HTMLElement;
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
      topButton.style.display = "block";
    } else {
      topButton.style.display = "none";
    }
  }

  topFunction(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
