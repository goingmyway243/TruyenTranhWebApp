import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AppComponent } from '../app.component';
import { AuthorModel } from '../models/author.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private apiUrl: string = AppComponent.baseUrl + 'api/authors';

  constructor(private http: HttpClient) { }

  getAll(): Observable<AuthorModel[]> {
    return this.http.get<AuthorModel[]>(this.apiUrl);
  }

  getById(id: number): Observable<AuthorModel> {
    let getUrl = `${this.apiUrl}/${id}`;
    return this.http.get(getUrl).pipe(map(data => Object.assign(new AuthorModel(), data)));
  }

  add(user: AuthorModel): Observable<AuthorModel> {
    return this.http.post<AuthorModel>(this.apiUrl, user, AppComponent.httpOptions);
  }

  update(user: AuthorModel): Observable<AuthorModel> {
    let putUrl = `${this.apiUrl}/${user.id}`;
    return this.http.put<AuthorModel>(putUrl, user, AppComponent.httpOptions);
  }

  delete(id: number): Observable<string> {
    let deleteUrl = `${this.apiUrl}/${id}`;
    return this.http.delete<string>(deleteUrl, AppComponent.httpOptions);
  }
}
