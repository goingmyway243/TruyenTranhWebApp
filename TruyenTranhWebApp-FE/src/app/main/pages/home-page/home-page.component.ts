import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ComicModel } from 'src/app/models/comic.model';
import { ComicService } from 'src/app/services/comic.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  listComics: ComicModel[] = [];
  listRecommends: ComicModel[] = [];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    autoWidth: true,
    pullDrag: false,
    dots: false,
    center: true,
    navSpeed: 600,
    navText: ['&#8249', '&#8250;'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      600: {
        items: 3
      },
      800: {
        items: 4
      },
      1000: {
        items: 5
      },
      1200: {
        items: 6
      }
    },
    nav: true,

  }

  constructor(
    private comicService: ComicService
  ) { }

  ngOnInit(): void {
    this.comicService.getAllOrderByTime().subscribe(data => {
      this.listComics = data;
      this.listRecommends = this.listComics.slice(0, 6);
    });
  }

}
