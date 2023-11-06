import { Page } from './../../core/interfaces/page.interface';
import { ApiResponse } from './../../core/interfaces/api-response.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  of,
  startWith,
} from 'rxjs';
import { Director, Movie } from 'src/app/core/interfaces/movie.interface';
import { MovieService } from 'src/app/core/services/movie.service';
import { NgForm } from '@angular/forms';
import { DirectorService } from 'src/app/core/services/director.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  public movies!: Movie[];
  public directors$: Observable<Director[]>;

  moviesState$: Observable<{
    appState: string;
    appData?: ApiResponse<Page>;
    error?: HttpErrorResponse;
  }>;

  responseSubject = new BehaviorSubject<ApiResponse<Page>>(null);
  public editMovie: Movie;
  public deleteMovie: Movie;

  constructor(
    private movieService: MovieService,
    private directorService: DirectorService
  ) {}


  ngOnInit(): void {
    this.moviesState$ = this.movieService.movies$().pipe(
      map((response: ApiResponse<Page>) => {
        this.responseSubject.next(response);
        console.log(response);
        return { appState: 'APP_LOADED', appData: response };
      }),
      startWith({ appState: 'APP_LOADING' }),
      catchError((error: HttpErrorResponse) =>
        of({ appState: 'APP_ERROR', error })
      )
    );
    this.directors$ = this.directorService.getDirectors().pipe(
      map(response => response.data)
    );
  }

  public goToPage(title?: string, pageNumber = 0): void {
    this.moviesState$ = this.movieService.movies$(title, pageNumber).pipe(
      map((response: ApiResponse<Page>) => {
        this.responseSubject.next(response);
        console.log(response);
        return { appState: 'APP_LOADED', appData: response };
      }),
      startWith({
        appState: 'APP_LOADED',
        appData: this.responseSubject.value,
      }),
      catchError((error: HttpErrorResponse) =>
        of({ appState: 'APP_ERROR', error })
      )
    );
  }

  public onOpenModal(movie: Movie, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addMovieModal');
    }
    if (mode === 'edit') {
      this.editMovie = movie;
      button.setAttribute('data-target', '#updateMovieModal');
    }
    if (mode === 'delete') {
      this.deleteMovie = movie;
      button.setAttribute('data-target', '#deleteMovieModal');
    }
    container.appendChild(button);
    button.click();
  }

  public onAddMovie(addForm: NgForm): void {
    document.getElementById('add-movie-form').click();
    this.movieService.addMovie(addForm.value).subscribe(
      (response: Movie) => {
        console.log(response);
        this.goToPage();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateMovie(movie: Movie): void {
    this.movieService.updateMovie(movie).subscribe(
      (response: Movie) => {
        console.log(response);
        this.goToPage();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteMovie(movieId: number): void {
    this.movieService.deleteMovie(movieId).subscribe(
      (response: void) => {
        console.log(response);
        this.goToPage();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
