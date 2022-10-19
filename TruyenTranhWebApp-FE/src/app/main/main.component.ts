import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private elmRef: ElementRef,
    private router: Router) { }

  ngOnInit(): void {
    this.initAvatarHoverEvent();
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
