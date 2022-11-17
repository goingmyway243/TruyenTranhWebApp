import { Component, OnInit } from '@angular/core';
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
    private comicService: ComicService,
    private contentService: ContentService
  ) { }

  ngOnInit(): void {
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
      });
    }
    else {
      this.router.navigate(['']);
    }
  }

}
