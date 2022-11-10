import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorModel } from 'src/app/models/author.model';
import { AuthorService } from 'src/app/services/author.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-add-author-page',
  templateUrl: './admin-add-author-page.component.html',
  styleUrls: ['./admin-add-author-page.component.scss']
})
export class AdminAddAuthorPageComponent implements OnInit {
  newAuthor: AuthorModel = new AuthorModel();

  addForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  constructor(private authorService: AuthorService, private router: Router) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.router.navigate(['quan-tri/quan-ly-tac-gia']);
  }

  postAuthor(): void {
    this.authorService.add(this.newAuthor).subscribe(
      data => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Thêm tác giả thành công!',
          showConfirmButton: false,
          timer: 1000
        }).then(result => {
          this.goBack();
        });
      },
      error => {
        let message = 'Có lỗi xảy ra!';

        if (error.status === 304) {
          message = 'Tác giả đã tồn tại!';
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
