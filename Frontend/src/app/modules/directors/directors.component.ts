import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  of,
  startWith,
} from 'rxjs';
import { ApiResponse } from 'src/app/core/interfaces/api-response.interface';
import { Director } from 'src/app/core/interfaces/movie.interface';
import { PageD } from 'src/app/core/interfaces/page.interface';
import { DirectorService } from 'src/app/core/services/director.service';

@Component({
  selector: 'app-directors',
  templateUrl: './directors.component.html',
  styleUrls: ['./directors.component.scss'],
})
export class DirectorsComponent implements OnInit {
  public directors$: Observable<Director[]>;
  public editDirector: Director;
  public deleteDirector: Director;

  directorsState$: Observable<{
    appState: string;
    appData?: ApiResponse<PageD>;
    error?: HttpErrorResponse;
  }>;

  responseSubject = new BehaviorSubject<ApiResponse<PageD>>(null);

  constructor(private directorService: DirectorService) {}

  ngOnInit(): void {
    this.directorsState$ = this.directorService.directors$().pipe(
      map((response: ApiResponse<PageD>) => {
        this.responseSubject.next(response);
        console.log(response);
        return { appState: 'APP_LOADED', appData: response };
      }),
      startWith({ appState: 'APP_LOADING' }),
      catchError((error: HttpErrorResponse) =>
        of({ appState: 'APP_ERROR', error })
      )
    );
    // this.directors$ = this.directorService
    //   .getDirectors()
    //   .pipe(map((response) => response.data));
  }

  public goToPageD(title?: string, pageNumber = 0): void {
    this.directorsState$ = this.directorService.directors$(title, pageNumber).pipe(
      map((response: ApiResponse<PageD>) => {
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


  public onOpenModal(director: Director, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addDirectorModal');
    }
    if (mode === 'edit') {
      this.editDirector = director;
      button.setAttribute('data-target', '#updateDirectorModal');
    }
    if (mode === 'delete') {
      this.deleteDirector = director;
      button.setAttribute('data-target', '#deleteDirectorModal');
    }
    container.appendChild(button);
    button.click();
  }

  public onAddDirector(addForm: NgForm): void {
    document.getElementById('add-director-form').click();
    this.directorService.addDirector(addForm.value).subscribe(
      (response: Director) => {
        console.log(response);
        this.goToPageD();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateDirector(director: Director): void {
    this.directorService.updateDirector(director).subscribe(
      (response: Director) => {
        console.log(response);
        this.goToPageD();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteDirector(directorId: number): void {
    this.directorService.deleteDirector(directorId).subscribe(
      (response: void) => {
        console.log(response);
        this.goToPageD();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
