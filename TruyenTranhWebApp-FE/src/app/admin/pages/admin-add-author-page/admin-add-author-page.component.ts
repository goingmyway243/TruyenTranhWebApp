import { Component, OnInit } from '@angular/core';
import { AuthorModel } from 'src/app/models/author.model';

@Component({
  selector: 'app-admin-add-author-page',
  templateUrl: './admin-add-author-page.component.html',
  styleUrls: ['./admin-add-author-page.component.scss']
})
export class AdminAddAuthorPageComponent implements OnInit {
  newAuthor: AuthorModel = new AuthorModel();

  constructor() { }

  ngOnInit(): void {
  }

  postAuthor(): void {

  }
}
