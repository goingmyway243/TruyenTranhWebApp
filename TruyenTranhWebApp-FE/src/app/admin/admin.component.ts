import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private elmRef: ElementRef) { }

  ngOnInit(): void {
    this.initToggleEvent();
  }

  initToggleEvent(): void {
    let toggle = this.elmRef.nativeElement.querySelector('.toggle') as HTMLElement;
    let navigation = this.elmRef.nativeElement.querySelector('.navigation') as HTMLElement;
    let main = this.elmRef.nativeElement.querySelector('body') as HTMLElement;

    toggle.addEventListener('click', () => {
      navigation.classList.toggle('active');
      main.classList.toggle('active');
    })
  }
}
