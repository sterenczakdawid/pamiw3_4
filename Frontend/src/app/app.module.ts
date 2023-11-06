import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './modules/search/search.component';
import { WeatherComponent } from './modules/weather/weather.component';
import { MoviesComponent } from './modules/movies/movies.component';
import { FormsModule } from '@angular/forms';
import { DirectorsComponent } from './modules/directors/directors.component';

@NgModule({
  declarations: [AppComponent, WeatherComponent, MoviesComponent, DirectorsComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SearchComponent,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
