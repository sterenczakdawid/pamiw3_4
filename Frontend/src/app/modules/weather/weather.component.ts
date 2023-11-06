import { Component, inject } from '@angular/core';
import { WeatherViewModel } from './weather.view-model';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent {
  weatherViewModel = inject(WeatherViewModel);
}
