import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comic-detail-page',
  templateUrl: './comic-detail-page.component.html',
  styleUrls: ['./comic-detail-page.component.scss']
})
export class ComicDetailPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  autoGrowTextZone(e: any) {
    e.target.style.height = "0px";
    e.target.style.height = (e.target.scrollHeight + 25) + "px";
  }
}
