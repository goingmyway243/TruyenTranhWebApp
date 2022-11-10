import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleType, UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-add-account-page',
  templateUrl: './admin-add-account-page.component.html',
  styleUrls: ['./admin-add-account-page.component.scss']
})
export class AdminAddAccountPageComponent implements OnInit {
  newAccount: UserModel = new UserModel();
  retypePass: string = '';
  selectedRole: number = 0;

  addForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    pass: new FormControl('', Validators.required),
    repass: new FormControl('', Validators.required),
    role: new FormControl(0)
  });

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.router.navigate(['quan-tri/quan-ly-tai-khoan']);
  }

  postAccount(): void {
    this.newAccount.role = this.selectedRole == 1 ? RoleType.ADMIN : RoleType.USER;

    this.userService.add(this.newAccount).subscribe(
      data => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Thêm tài khoản thành công!',
          showConfirmButton: false,
          timer: 1000
        }).then(result => {
          this.goBack();
        });
      },
      error => {
        let message = 'Có lỗi xảy ra!';

        if (error.status === 304) {
          message = 'Email đã được sử dụng!';
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
