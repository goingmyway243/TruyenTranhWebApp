import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AppComponent } from '../app.component';
import { ChapterModel } from '../models/chapter.model';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {
  private apiUrl: string = AppComponent.baseUrl + 'api/chapters';

  constructor(private http: HttpClient) { }

  getAll(): Observable<ChapterModel[]> {
    return this.http.get<ChapterModel[]>(this.apiUrl);
  }

  getById(id: number): Observable<ChapterModel> {
    let getUrl = `${this.apiUrl}/${id}`;
    return this.http.get(getUrl).pipe(map(data => Object.assign(new ChapterModel(), data)));
  }

  add(chapter: ChapterModel): Observable<ChapterModel> {
    return this.http.post<ChapterModel>(this.apiUrl, chapter, AppComponent.httpOptions);
  }

  update(chapter: ChapterModel): Observable<ChapterModel> {
    let putUrl = `${this.apiUrl}/${chapter.id}`;
    return this.http.put<ChapterModel>(putUrl, chapter, AppComponent.httpOptions);
  }

  delete(id: number): Observable<string> {
    let deleteUrl = `${this.apiUrl}/${id}`;
    return this.http.delete<string>(deleteUrl, AppComponent.httpOptions);
  }

  validateIndex(chapter: ChapterModel): Observable<boolean> {
    let validateUrl = `${this.apiUrl}/validateIndex`;
    return this.http.post<boolean>(validateUrl, chapter, AppComponent.httpOptions);
  }
}
