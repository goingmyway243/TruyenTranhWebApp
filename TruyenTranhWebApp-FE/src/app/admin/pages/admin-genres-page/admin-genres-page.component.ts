import { Component, OnInit } from '@angular/core';
import { GenreModel } from 'src/app/models/genre.model';
import { GenreService } from 'src/app/services/genre.service';

@Component({
  selector: 'app-admin-genres-page',
  templateUrl: './admin-genres-page.component.html',
  styleUrls: ['./admin-genres-page.component.scss']
})
export class AdminGenresPageComponent implements OnInit {
  listGenres: GenreModel[] = []

  constructor(private genreService: GenreService) { }

  ngOnInit(): void {
    this.genreService.getAll().subscribe(data => this.listGenres = data);
  }

}
