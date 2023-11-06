import { ApiResponse } from './../interfaces/api-response.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../interfaces/movie.interface';
import { environment } from 'src/environments/environment.development';
import { Page } from '../interfaces/page.interface';
import { ENDPOINTS } from '../constants/Endpoints.const';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  movies$ = (title = '', page = 0, size = 5): Observable<ApiResponse<Page>> =>
    this.http.get<ApiResponse<Page>>(
      environment.apiBaseUrl + ENDPOINTS.MOVIES_GET + `?title=${title}&page=${page}&size=${size}`
    );

  public addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(environment.apiBaseUrl + ENDPOINTS.MOVIES_ADD, movie);
  }

  public updateMovie(movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(environment.apiBaseUrl + ENDPOINTS.MOVIES_UPDATE, movie);
  }

  public deleteMovie(movieId: number): Observable<void> {
    return this.http.delete<void>(
      environment.apiBaseUrl + ENDPOINTS.MOVIES_DELETE + movieId
    );
  }
}
