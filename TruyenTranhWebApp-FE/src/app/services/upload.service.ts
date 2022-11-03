import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private apiUrl = AppComponent.baseUrl + 'api/uploads';

  constructor(private http: HttpClient) { }

  upload(file: File, fileName: string, folderName?: string): Observable<HttpEvent<any>> {
    let uploadUrl = folderName ? `${this.apiUrl}/${folderName}` : this.apiUrl;
    const formData: FormData = new FormData();

    formData.append('file', file, fileName);

    const req = new HttpRequest('POST', uploadUrl, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
