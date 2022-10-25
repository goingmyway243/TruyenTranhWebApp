import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {
  newUser: UserModel = new UserModel();
  retypePass: string = "";

  signUpForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    pass: new FormControl('', Validators.required),
    repass: new FormControl('', Validators.required)
  });

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onRegister(): void {
    console.log(this.newUser);
    this.userService.add(this.newUser).subscribe(
      data => {
        // this.accountService.generateDefaultAvatar(data).subscribe();

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Tạo tài khoản thành công!',
          showConfirmButton: false,
          timer: 1500
        }).then(result => {
          this.router.navigateByUrl('');
        });
      },
      error => console.log(error));
  }
}
