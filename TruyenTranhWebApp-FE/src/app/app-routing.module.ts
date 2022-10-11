import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { MainComponent } from './main/main.component';
import { ComicDetailPageComponent } from './main/pages/comic-detail-page/comic-detail-page.component';
import { HomePageComponent } from './main/pages/home-page/home-page.component';
import { LoginPageComponent } from './main/pages/login-page/login-page.component';
import { SignupPageComponent } from './main/pages/signup-page/signup-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'dang-nhap', component: LoginPageComponent },
      { path: 'dang-ky', component: SignupPageComponent },
      { path: 'truyen-tranh/:id', component: ComicDetailPageComponent }
    ]
  },
  {
    path: 'quan-tri', component: AdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
