import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AppComponent } from '../app.component';
import { ContentModel } from '../models/content.model';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private apiUrl: string = AppComponent.baseUrl + 'api/contents';

  constructor(private http: HttpClient) { }

  getAll(): Observable<ContentModel[]> {
    return this.http.get<ContentModel[]>(this.apiUrl);
  }

  getById(id: number): Observable<ContentModel> {
    let getUrl = `${this.apiUrl}/${id}`;
    return this.http.get(getUrl).pipe(map(data => Object.assign(new ContentModel(), data)));
  }

  add(user: ContentModel): Observable<ContentModel> {
    return this.http.post<ContentModel>(this.apiUrl, user, AppComponent.httpOptions);
  }

  update(user: ContentModel): Observable<ContentModel> {
    let putUrl = `${this.apiUrl}/${user.id}`;
    return this.http.put<ContentModel>(putUrl, user, AppComponent.httpOptions);
  }

  delete(id: number): Observable<string> {
    let deleteUrl = `${this.apiUrl}/${id}`;
    return this.http.delete<string>(deleteUrl, AppComponent.httpOptions);
  }
}
