import { Component } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TruyenTranhWebApp-FE';
  static baseUrl: string = 'https://localhost:8080/';
  static httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
}
