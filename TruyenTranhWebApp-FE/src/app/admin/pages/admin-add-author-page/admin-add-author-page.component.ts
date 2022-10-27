import { Component, OnInit } from '@angular/core';
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

  constructor(private authorService: AuthorService, private router: Router) { }

  ngOnInit(): void {
  }

  postAuthor(): void {
    this.authorService.add(this.newAuthor).subscribe(
      data => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Thêm tác giả thành công!',
          showConfirmButton: false,
          timer: 1500
        }).then(result => {
          this.router.navigate(['quan-tri/quan-ly-tac-gia']);
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
