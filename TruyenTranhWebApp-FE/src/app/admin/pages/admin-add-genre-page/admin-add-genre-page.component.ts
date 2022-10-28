import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GenreModel } from 'src/app/models/genre.model';
import { GenreService } from 'src/app/services/genre.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-add-genre-page',
  templateUrl: './admin-add-genre-page.component.html',
  styleUrls: ['./admin-add-genre-page.component.scss']
})
export class AdminAddGenrePageComponent implements OnInit {
  newGenre: GenreModel = new GenreModel();

  addForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  constructor(private genreService: GenreService, private router: Router) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.router.navigate(['quan-tri/quan-ly-the-loai']);
  }
  postGenre(): void {
    this.genreService.add(this.newGenre).subscribe(
      data => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Thêm thể loại thành công!',
          showConfirmButton: false,
          timer: 1500
        }).then(result => {
          this.goBack();
        });
      },
      error => {
        let message = 'Có lỗi xảy ra!';

        if (error.status === 304) {
          message = 'Thể loại đã tồn tại!';
        }

        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: message,
          showConfirmButton: false,
          timer: 1500
        });
      });
  }
}
