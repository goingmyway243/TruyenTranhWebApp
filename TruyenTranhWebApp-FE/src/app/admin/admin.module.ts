import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminDashboardPageComponent } from './pages/admin-dashboard-page/admin-dashboard-page.component';
import { AdminComicsPageComponent } from './pages/admin-comics-page/admin-comics-page.component';
import { AdminAuthorsPageComponent } from './pages/admin-authors-page/admin-authors-page.component';
import { AdminGenresPageComponent } from './pages/admin-genres-page/admin-genres-page.component';
import { AdminAccountsPageComponent } from './pages/admin-accounts-page/admin-accounts-page.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AdminComponent,
    AdminDashboardPageComponent,
    AdminComicsPageComponent,
    AdminAuthorsPageComponent,
    AdminGenresPageComponent,
    AdminAccountsPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class AdminModule { }
