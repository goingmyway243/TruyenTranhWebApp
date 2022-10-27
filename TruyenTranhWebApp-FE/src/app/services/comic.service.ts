import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AppComponent } from '../app.component';
import { ComicModel } from '../models/comic.model';

@Injectable({
  providedIn: 'root'
})
export class ComicService {
  private apiUrl: string = AppComponent.baseUrl + 'api/comics';

  constructor(private http: HttpClient) { }

  getAll(): Observable<ComicModel[]> {
    return this.http.get<ComicModel[]>(this.apiUrl);
  }

  getById(id: number): Observable<ComicModel> {
    let getUrl = `${this.apiUrl}/${id}`;
    return this.http.get(getUrl).pipe(map(data => Object.assign(new ComicModel(), data)));
  }

  add(user: ComicModel): Observable<ComicModel> {
    return this.http.post<ComicModel>(this.apiUrl, user, AppComponent.httpOptions);
  }

  update(user: ComicModel): Observable<ComicModel> {
    let putUrl = `${this.apiUrl}/${user.id}`;
    return this.http.put<ComicModel>(putUrl, user, AppComponent.httpOptions);
  }

  delete(id: number): Observable<string> {
    let deleteUrl = `${this.apiUrl}/${id}`;
    return this.http.delete<string>(deleteUrl, AppComponent.httpOptions);
  }
}
