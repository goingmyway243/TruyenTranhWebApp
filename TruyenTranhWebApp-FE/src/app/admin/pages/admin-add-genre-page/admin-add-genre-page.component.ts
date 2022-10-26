import { Component, OnInit } from '@angular/core';
import { GenreModel } from 'src/app/models/genre.model';
import { GenreService } from 'src/app/services/genre.service';

@Component({
  selector: 'app-admin-add-genre-page',
  templateUrl: './admin-add-genre-page.component.html',
  styleUrls: ['./admin-add-genre-page.component.scss']
})
export class AdminAddGenrePageComponent implements OnInit {
  newGenre: GenreModel = new GenreModel();

  constructor(private genreService: GenreService) { }

  ngOnInit(): void {
  }

  postGenre(): void {
    this.genreService.add(this.newGenre).subscribe(data => console.log(data));
  }
}
