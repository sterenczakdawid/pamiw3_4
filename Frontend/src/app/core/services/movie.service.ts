import { ApiResponse } from './../interfaces/api-response.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../interfaces/movie.interface';
import { environment } from 'src/environments/environment.development';
import { Page } from '../interfaces/page.interface';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  movies$ = (title = '', page = 0, size = 5): Observable<ApiResponse<Page>> =>
    this.http.get<ApiResponse<Page>>(
      `${this.apiServerUrl}/api/v1/movies/all?title=${title}&page=${page}&size=${size}`
    );

  public addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.apiServerUrl}/api/v1/movies/add`, movie);
  }

  public updateMovie(movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${this.apiServerUrl}/api/v1/movies/update`, movie);
  }

  public deleteMovie(movieId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/api/v1/movies/delete/${movieId}`
    );
  }
}
