import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { ComicChapterPageComponent } from './pages/comic-chapter-page/comic-chapter-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CommentItemComponent } from './components/comment-item/comment-item.component';
import { MainComicItemComponent } from './components/main-comic-item/main-comic-item.component';
import { MiniComicItemComponent } from './components/mini-comic-item/mini-comic-item.component';
import { SlideComicItemComponent } from './components/slide-comic-item/slide-comic-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { SearchResultPageComponent } from './pages/search-result-page/search-result-page.component';
import { ComicDetailPageComponent } from './pages/comic-detail-page/comic-detail-page.component';



@NgModule({
  declarations: [
    MainComponent,
    ComicChapterPageComponent,
    HomePageComponent,
    CommentItemComponent,
    MainComicItemComponent,
    MiniComicItemComponent,
    SlideComicItemComponent,
    LoginPageComponent,
    SignupPageComponent,
    SearchResultPageComponent,
    ComicDetailPageComponent
  ],
  imports: [
    CommonModule,
    CarouselModule,
    RouterModule,
    BrowserAnimationsModule
  ]
})
export class MainModule { }
