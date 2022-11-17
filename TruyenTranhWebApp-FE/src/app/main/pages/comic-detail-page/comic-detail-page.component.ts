import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorModel } from 'src/app/models/author.model';
import { ChapterModel } from 'src/app/models/chapter.model';
import { ComicModel } from 'src/app/models/comic.model';
import { ReviewModel, ReviewType } from 'src/app/models/review.model';
import { UserModel } from 'src/app/models/user.model';
import { AuthorService } from 'src/app/services/author.service';
import { ComicService } from 'src/app/services/comic.service';
import { ReviewService } from 'src/app/services/review.service';
import { UserService } from 'src/app/services/user.service';
import { Utils } from 'src/app/utils/utils';
import { MainComponent } from '../../main.component';

@Component({
  selector: 'app-comic-detail-page',
  templateUrl: './comic-detail-page.component.html',
  styleUrls: ['./comic-detail-page.component.scss']
})
export class ComicDetailPageComponent implements OnInit {
  comic: ComicModel = new ComicModel();
  listChapters: ChapterModel[] = [];
  user: UserModel = new UserModel();
  author: AuthorModel = new AuthorModel();
  updatedTime: string = '';

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private comicService: ComicService,
    private userService: UserService,
    private authorService: AuthorService,
    private reviewService: ReviewService) { }

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    if (id) {
      this.comicService.getById(+id).subscribe(data => {
        this.comic = data;
        this.listChapters = this.comic.chapters
          .sort((a, b) => b.chapterIndex - a.chapterIndex)
          .slice(0, 3)
          .map(chapter => Object.assign(new ChapterModel(), chapter));
        this.userService.getById(this.comic.userId).subscribe(data => this.user = data);
        this.authorService.getById(this.comic.authorId).subscribe(data => this.author = data);
        this.updatedTime = Utils.getUpdatedDateTime(this.listChapters.at(-1)!.createdTime);
      });
    }
    else {
      this.router.navigate(['']);
    }
  }

  navigateToChapter(index: number) {
    this.router.navigate([`./chuong/${index}`], { relativeTo: this.activeRoute });
  }

  likeComic(isLike: boolean) {
    let review = new ReviewModel();
    review.type = isLike ? ReviewType.LIKE : ReviewType.DISLIKE;
    review.comic = this.comic;
    review.user = MainComponent.currentUser;

    this.reviewService.add(review).subscribe(data => console.log(data));
  }
}
