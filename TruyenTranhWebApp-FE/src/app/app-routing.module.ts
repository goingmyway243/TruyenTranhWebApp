import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardPageComponent } from './admin/pages/admin-dashboard-page/admin-dashboard-page.component';
import { MainComponent } from './main/main.component';
import { AddComicPageComponent } from './main/pages/add-comic-page/add-comic-page.component';
import { ComicChapterPageComponent } from './main/pages/comic-chapter-page/comic-chapter-page.component';
import { ComicDetailPageComponent } from './main/pages/comic-detail-page/comic-detail-page.component';
import { HomePageComponent } from './main/pages/home-page/home-page.component';
import { LoginPageComponent } from './main/pages/login-page/login-page.component';
import { SearchResultPageComponent } from './main/pages/search-result-page/search-result-page.component';
import { SignupPageComponent } from './main/pages/signup-page/signup-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'dang-nhap', component: LoginPageComponent },
      { path: 'dang-ky', component: SignupPageComponent },
      { path: 'truyen-tranh/:id', component: ComicDetailPageComponent },
      { path: 'truyen-tranh/:id/chuong/:chapterId', component: ComicChapterPageComponent },
      { path: 'tim-kiem/:keyword', component: SearchResultPageComponent },
      { path: 'tim-kiem/the-loai/:genre', component: SearchResultPageComponent },
      { path: 'them-truyen', component: AddComicPageComponent }
    ]
  },
  {
    path: 'quan-tri',
    component: AdminComponent,
    children: [
      { path: '', component: AdminDashboardPageComponent },
      { path: 'quan-ly-truyen', component: AdminDashboardPageComponent },
      { path: 'quan-ly-the-loai', component: AdminDashboardPageComponent },
      { path: 'quan-ly-tac-gia', component: AdminDashboardPageComponent },
      { path: 'quan-ly-tai-khoan', component: AdminDashboardPageComponent }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
