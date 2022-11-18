import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChapterModel } from 'src/app/models/chapter.model';
import { ComicModel } from 'src/app/models/comic.model';
import { ReviewModel, ReviewType } from 'src/app/models/review.model';
import { ComicService } from 'src/app/services/comic.service';
import { ReviewService } from 'src/app/services/review.service';
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
  updatedTime: string = '';
  totalLike: number = 0;
  totalDislike: number = 0;
  reviewedByUser?: ReviewModel;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private comicService: ComicService,
    private reviewService: ReviewService) { }

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    if (id) {
      this.comicService.getById(+id).subscribe(data => {
        this.comic = data;
        this.getComicReviews();
        this.listChapters = this.comic.chapters
          .sort((a, b) => b.chapterIndex - a.chapterIndex)
          .slice(0, 3)
          .map(chapter => Object.assign(new ChapterModel(), chapter));
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

  getComicReviews(): void {
    this.reviewService.getByComicId(this.comic.id).subscribe(data => {
      this.comic.reviews = data;
      this.calculateTotalLike(this.comic.reviews);
    });
  }

  likeComic(isLike: boolean) {
    if (this.reviewedByUser) {
      if ((isLike && this.reviewedByUser.type.toString() == ReviewType[ReviewType.LIKE])
        || (!isLike && this.reviewedByUser.type.toString() == ReviewType[ReviewType.DISLIKE])) {
        this.reviewService
          .delete(this.reviewedByUser.user!.id, this.reviewedByUser.comic!.id)
          .subscribe(data => this.getComicReviews());
      } else {
        this.reviewedByUser.type = isLike ? ReviewType.LIKE : ReviewType.DISLIKE;
        this.reviewService
          .update(this.reviewedByUser)
          .subscribe(data => this.getComicReviews());
      }
    }

    let review = new ReviewModel();
    review.type = isLike ? ReviewType.LIKE : ReviewType.DISLIKE;
    review.comic = this.comic;
    review.user = MainComponent.currentUser;

    this.reviewService.add(review).subscribe(data => this.getComicReviews());
  }

  calculateTotalLike(listReviews: ReviewModel[]) {
    this.totalLike = 0;
    this.totalDislike = 0;

    listReviews.forEach(review => {
      if (review.user?.id == MainComponent.currentUser?.id) {
        this.reviewedByUser = review;
      }

      if (review.type.toString() == ReviewType[ReviewType.LIKE]) {
        this.totalLike++;
      }
      else {
        this.totalDislike++;
      }
    })
  }
}
