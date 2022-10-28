import { Component, HostListener } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  static baseUrl: string = 'http://localhost:8080/';
  static httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  title = 'TruyenTranhWebApp-FE';

  // public doUnload(): void {
  //   this.doBeforeUnload();
  // }

  // public doBeforeUnload(): void {
  //   let stayLogin = localStorage.getItem('stayLogin');
  //   if (!stayLogin) {
  //     localStorage.removeItem('currentUser');
  //   }
  // }
}
