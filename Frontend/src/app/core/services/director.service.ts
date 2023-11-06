import { ServiceResponse } from './../interfaces/service-response.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Director } from '../interfaces/movie.interface';
import { ApiResponse } from '../interfaces/api-response.interface';
import { PageD } from '../interfaces/page.interface';

@Injectable({
  providedIn: 'root',
})
export class DirectorService {
  constructor(private http: HttpClient) {}

  private apiServerUrl = environment.apiBaseUrl;

  directors$ = (
    name = '',
    page = 0,
    size = 5
  ): Observable<ApiResponse<PageD>> =>
    this.http.get<ApiResponse<PageD>>(
      `${this.apiServerUrl}/api/v1/directors/allp?name=${name}&page=${page}&size=${size}`
    );

  public getDirectors(): Observable<ServiceResponse<Director[]>> {
    return this.http.get<ServiceResponse<Director[]>>(
      `${this.apiServerUrl}/api/v1/directors/all`
    );
  }

  public addDirector(director: Director): Observable<Director> {
    return this.http.post<Director>(
      `${this.apiServerUrl}/api/v1/directors/add`,
      director
    );
  }

  public updateDirector(director: Director): Observable<Director> {
    return this.http.put<Director>(
      `${this.apiServerUrl}/api/v1/directors/update`,
      director
    );
  }

  public deleteDirector(directorId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/api/v1/directors/delete/${directorId}`
    );
  }
}
