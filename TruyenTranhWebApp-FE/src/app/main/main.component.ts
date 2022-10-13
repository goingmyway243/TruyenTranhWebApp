import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private elmRef: ElementRef) { }

  ngOnInit(): void {
    this.initAvatarHoverEvent();
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
