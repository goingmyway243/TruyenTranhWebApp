import { Component, OnInit } from '@angular/core';
import { AuthorModel } from 'src/app/models/author.model';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-admin-authors-page',
  templateUrl: './admin-authors-page.component.html',
  styleUrls: ['./admin-authors-page.component.scss']
})
export class AdminAuthorsPageComponent implements OnInit {
  listAuthors: AuthorModel[] = [];

  constructor(private authorService: AuthorService) { }

  ngOnInit(): void {
    this.authorService.getAll().subscribe(data => this.listAuthors = data);
  }

}
