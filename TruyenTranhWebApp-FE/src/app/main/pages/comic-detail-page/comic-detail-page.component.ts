import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorModel } from 'src/app/models/author.model';
import { ChapterModel } from 'src/app/models/chapter.model';
import { ComicModel } from 'src/app/models/comic.model';
import { UserModel } from 'src/app/models/user.model';
import { AuthorService } from 'src/app/services/author.service';
import { ComicService } from 'src/app/services/comic.service';
import { UserService } from 'src/app/services/user.service';

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

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private comicService: ComicService,
    private userService: UserService,
    private authorService: AuthorService) { }

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
      });
    }
    else {
      this.router.navigate(['']);
    }
  }

}
