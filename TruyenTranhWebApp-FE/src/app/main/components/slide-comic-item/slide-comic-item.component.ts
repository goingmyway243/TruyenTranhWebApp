import { Component, Input, OnInit } from '@angular/core';
import { ChapterModel } from 'src/app/models/chapter.model';
import { ComicModel } from 'src/app/models/comic.model';

@Component({
  selector: 'app-slide-comic-item',
  templateUrl: './slide-comic-item.component.html',
  styleUrls: ['./slide-comic-item.component.scss']
})
export class SlideComicItemComponent implements OnInit {
  @Input() comic: ComicModel = new ComicModel();
  newestChapter: ChapterModel = new ChapterModel();

  constructor() { }

  ngOnInit(): void {
    this.comic = Object.assign(new ComicModel(), this.comic);
    this.newestChapter = Object.assign(
      new ChapterModel(),
      this.comic.chapters.sort((a, b) => b.chapterIndex - a.chapterIndex)[0]
    );
  }

}
