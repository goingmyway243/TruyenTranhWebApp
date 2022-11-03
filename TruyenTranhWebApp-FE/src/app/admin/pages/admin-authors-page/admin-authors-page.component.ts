import { Component, OnInit } from '@angular/core';
import { AuthorModel } from 'src/app/models/author.model';
import { AuthorService } from 'src/app/services/author.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-authors-page',
  templateUrl: './admin-authors-page.component.html',
  styleUrls: ['./admin-authors-page.component.scss']
})
export class AdminAuthorsPageComponent implements OnInit {
  listAuthors: AuthorModel[] = [];

  constructor(private authorService: AuthorService) { }

  ngOnInit(): void {
    this.getAllAuthors();
  }

  getAllAuthors(): void {
    this.authorService.getAll().subscribe(data => this.listAuthors = data);
  }

  removeAuthor(id: number): void {
    Swal.fire({
      icon: 'question',
      title: 'Đăng xuất',
      text: `Bạn có chắc muốn xóa tác giả có mã '${id}'?`,
      showCancelButton: true,
      showConfirmButton: true,
      focusCancel: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Không',
      confirmButtonColor: 'var(--color-primary)',
      cancelButtonColor: 'var(--color-danger)'
    }).then(result => {
      if (result.isConfirmed) {
        this.authorService.delete(id).subscribe(
          data => {
            this.getAllAuthors();
          },
          error => {
            console.log(error);
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Có lỗi xảy ra!',
              showConfirmButton: false,
              timer: 1500
            });
          });
      }
    });
  }
}
