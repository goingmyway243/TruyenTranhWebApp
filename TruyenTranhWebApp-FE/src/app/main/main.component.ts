import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserModel } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  static currentUser?: UserModel;

  constructor(
    private elmRef: ElementRef,
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.initAvatarHoverEvent();

    let userId = localStorage.getItem('authorizeToken');
    if (userId) {
      this.userService.getById(+userId).subscribe(data => MainComponent.currentUser = data);
    }
  }

  getCurrentUser(): UserModel | undefined {
    return MainComponent.currentUser;
  }

  onLogout(): void {
    Swal.fire({
      icon: 'question',
      title: 'Đăng xuất',
      text: 'Bạn có chắc muốn đăng xuất?',
      showCancelButton: true,
      showConfirmButton: true,
      focusCancel: true,
      confirmButtonText: 'Có, đăng xuất',
      cancelButtonText: 'Không, ở lại',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then(result => {
      if (result.isConfirmed) {
        localStorage.removeItem('authorizeToken');
        window.location.reload();
      }
    });
  }

  onSearch(event: any): void {
    this.router.navigate(['tim-kiem/aaa']);
  }

  initAvatarHoverEvent(): void {
    let hoverPanel = this.elmRef.nativeElement.querySelector('.hover-panel') as HTMLElement;
    let avatar = this.elmRef.nativeElement.querySelector('.user-info') as HTMLElement;

    avatar.addEventListener('mouseover', () => {
      hoverPanel.style.display = 'flex';
    });

    avatar.addEventListener('mouseleave', () => {
      hoverPanel.style.display = 'none';
    });

    hoverPanel.addEventListener('mouseover', () => {
      hoverPanel.style.display = 'flex';
    });

    hoverPanel.addEventListener('mouseleave', () => {
      hoverPanel.style.display = 'none';
    });
  }
}
