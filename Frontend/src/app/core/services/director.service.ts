import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Director } from '../interfaces/movie.interface';
import { ApiResponse } from '../interfaces/api-response.interface';
import { PageD } from '../interfaces/page.interface';
import { ENDPOINTS } from '../constants/Endpoints.const';
import { ServiceResponse } from '../interfaces/service-response.interface';

@Injectable({
  providedIn: 'root',
})
export class DirectorService {
  constructor(private http: HttpClient) {}

  directors$ = (
    name = '',
    page = 0,
    size = 5
  ): Observable<ApiResponse<PageD>> =>
    this.http.get<ApiResponse<PageD>>(
      environment.apiBaseUrl +
        ENDPOINTS.DIRECTORS_GET +
        `?name=${name}&page=${page}&size=${size}`
    );

  public getDirectors(): Observable<ServiceResponse<Director[]>> {
    return this.http.get<ServiceResponse<Director[]>>(
      environment.apiBaseUrl + ENDPOINTS.DIRECTORS
    );
  }

  public addDirector(director: Director): Observable<Director> {
    return this.http.post<Director>(
      environment.apiBaseUrl + ENDPOINTS.DIRECTORS_ADD,
      director
    );
  }

  public updateDirector(director: Director): Observable<Director> {
    return this.http.put<Director>(
      environment.apiBaseUrl + ENDPOINTS.DIRECTORS_UPDATE,
      director
    );
  }

  public deleteDirector(directorId: number): Observable<void> {
    return this.http.delete<void>(
      environment.apiBaseUrl + ENDPOINTS.DIRECTORS_DELETE + `${directorId}`
    );
  }
}
