import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MainComicItemComponent } from './components/main-comic-item/main-comic-item.component';
import { SlideComicItemComponent } from './components/slide-comic-item/slide-comic-item.component';
import { MiniComicItemComponent } from './components/mini-comic-item/mini-comic-item.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { ComicDetailPageComponent } from './pages/comic-detail-page/comic-detail-page.component';
import { ComicChapterPageComponent } from './pages/comic-chapter-page/comic-chapter-page.component';
import { CommentItemComponent } from './components/comment-item/comment-item.component';
import { SearchResultPageComponent } from './pages/search-result-page/search-result-page.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MainComicItemComponent,
    SlideComicItemComponent,
    MiniComicItemComponent,
    LoginPageComponent,
    SignupPageComponent,
    ComicDetailPageComponent,
    ComicChapterPageComponent,
    CommentItemComponent,
    SearchResultPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    RouterModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
