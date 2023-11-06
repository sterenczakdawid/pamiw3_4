import { Component, inject } from '@angular/core';
import { WeatherService } from 'src/app/core/services/weather.service';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { City } from 'src/app/core/interfaces/city.interface';
import { Observable } from 'rxjs';
import {
  ForecastHour,
  Weather,
} from 'src/app/core/interfaces/weather.interface';
import { WeatherViewModel } from '../weather/weather.view-model';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    CommonModule,
  ],
})
export class SearchComponent {
  constructor(private weatherService: WeatherService) {}
  weatherViewModel = inject(WeatherViewModel);

  control = new FormControl<string>('');
  cities: City[] = [];
  options$!: Observable<City[]>;
  city!: City;
  weather!: Weather;
  forecast!: ForecastHour;


  onEnter(): void {
    const value = this.control.value;
    if (value) {
      this.options$ = this.weatherService.getLocations(value);
      this.options$.subscribe((res) => (this.cities = res));
    }
  }

  onSelect(val: MatAutocompleteSelectedEvent): void {
    const value = val?.option?.value as string;
    const selectedCity = this.cities.find(
      (item) => item.LocalizedName == value
    );
    if (selectedCity) {
      this.city = selectedCity;
      this.weatherViewModel.City = selectedCity;
    }
  }

  
}
