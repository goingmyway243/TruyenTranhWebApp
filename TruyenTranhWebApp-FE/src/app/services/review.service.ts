import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AppComponent } from '../app.component';
import { ReviewModel } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl: string = AppComponent.baseUrl + 'api/genres';

  constructor(private http: HttpClient) { }

  getAll(): Observable<ReviewModel[]> {
    return this.http.get<ReviewModel[]>(this.apiUrl);
  }

  getById(id: number): Observable<ReviewModel> {
    let getUrl = `${this.apiUrl}/${id}`;
    return this.http.get(getUrl).pipe(map(data => Object.assign(new ReviewModel(), data)));
  }

  add(review: ReviewModel): Observable<ReviewModel> {
    return this.http.post<ReviewModel>(this.apiUrl, review);
  }

  delete(id: number): Observable<string> {
    let deleteUrl = `${this.apiUrl}/${id}`;
    return this.http.delete<string>(deleteUrl, AppComponent.httpOptions);
  }
}
