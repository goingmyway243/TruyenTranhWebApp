import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComicDetailPageComponent } from './pages/comic-detail-page/comic-detail-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'dang-nhap', component: LoginPageComponent },
  { path: 'dang-ky', component: SignupPageComponent },
  { path: 'truyen-tranh/:id', component: ComicDetailPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
