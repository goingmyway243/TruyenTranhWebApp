import { Component, OnInit } from '@angular/core';
import { ComicModel } from 'src/app/models/comic.model';
import { ComicService } from 'src/app/services/comic.service';

@Component({
  selector: 'app-admin-comics-page',
  templateUrl: './admin-comics-page.component.html',
  styleUrls: ['./admin-comics-page.component.scss']
})
export class AdminComicsPageComponent implements OnInit {
  listComics: ComicModel[] = [];

  constructor(private comicService: ComicService) { }

  ngOnInit(): void {
    this.getAllComics();
  }

  getAllComics(): void {
    this.comicService.getAll().subscribe(data => this.listComics = data);
  }
}
