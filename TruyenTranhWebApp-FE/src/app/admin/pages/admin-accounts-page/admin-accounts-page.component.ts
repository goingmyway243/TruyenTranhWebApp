import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-accounts-page',
  templateUrl: './admin-accounts-page.component.html',
  styleUrls: ['./admin-accounts-page.component.scss']
})
export class AdminAccountsPageComponent implements OnInit {
  listAccounts: UserModel[] = [];

  constructor(
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.getAllAccounts();
  }

  getAllAccounts(): void {
    this.userService.getAll().subscribe(data => this.listAccounts = data);
  }

  addAccount(): void {
    this.router.navigate(['quan-tri/them-tai-khoan']);
  }

  editAccount(id: number): void {
    this.router.navigate([`quan-tri/cap-nhat-tai-khoan/${id}`]);
  }

  lockAccount(id: number): void {

  }

  removeAccount(id: number): void {
    Swal.fire({
      icon: 'question',
      title: 'Xóa',
      text: `Bạn có chắc muốn xóa tài khoản có mã '${id}'?`,
      showCancelButton: true,
      showConfirmButton: true,
      focusCancel: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Không',
      confirmButtonColor: 'var(--color-primary)',
      cancelButtonColor: 'var(--color-danger)'
    }).then(result => {
      if (result.isConfirmed) {
        this.userService.delete(id).subscribe(
          data => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Xóa thành công!',
              showConfirmButton: false,
              timer: 1000
            }).then(result => {
              this.getAllAccounts();
            });
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
