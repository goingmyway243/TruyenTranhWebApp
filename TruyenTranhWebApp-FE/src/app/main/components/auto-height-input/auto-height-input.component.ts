import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auto-height-input',
  templateUrl: './auto-height-input.component.html',
  styleUrls: ['./auto-height-input.component.scss']
})
export class AutoHeightInputComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  autoGrowTextZone(e: any) {
    e.target.style.height = "0px";
    e.target.style.height = (e.target.scrollHeight + 25) + "px";
  }
}
