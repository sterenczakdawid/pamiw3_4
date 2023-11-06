import { Injectable } from '@angular/core';
import { City } from 'src/app/core/interfaces/city.interface';
import { WeatherService } from 'src/app/core/services/weather.service';

@Injectable({
  providedIn: 'root',
})
export class WeatherViewModel {
  constructor(private weatherService: WeatherService) {}
  private city!: City;
  temperature = 0;
  temperatureOneHour = 0;
  temperature12Hours = 0;
  temperatureTomorrow = 0;
  temperature5Days = 0;
  temperatureYesterday = 0;

  get City(): City {
    return this.city;
  }

  set City(city: City) {
    this.city = city;
    if (city) {
      this.getCurrentConditions();
      this.getConditionsIn1Hour();
      this.getConditionsIn12Hours();
      this.getConditionsForTomorrow();
      this.getConditionsIn5Days();
      this.getConditionsForYesterday();
    }
  }

  getCurrentConditions() {
    this.weatherService
      .getCurrentConditions(this.city.Key)
      .subscribe((data) => {
        this.temperature = data[0].Temperature.Metric.Value;
        console.log(this.temperature);
      });
  }

  getConditionsIn1Hour() {
    this.weatherService
      .getConditionsIn1Hour(this.city.Key)
      .subscribe((data) => {
        this.temperatureOneHour = data[0].Temperature.Value;
        console.log(this.temperatureOneHour);
      });
  }

  getConditionsIn12Hours() {
    this.weatherService
      .getConditionsIn12Hours(this.city.Key)
      .subscribe((data) => {
        this.temperature12Hours = data[11].Temperature.Value;
        console.log(this.temperature12Hours);
      });
  }

  getConditionsForTomorrow() {
    this.weatherService
      .getConditionsForTomorrow(this.city.Key)
      .subscribe((data) => {
        this.temperatureTomorrow =
          data.DailyForecasts[0].Temperature.Maximum.Value;
        console.log(data.DailyForecasts[0].Temperature.Maximum.Value);
      });
  }

  getConditionsIn5Days() {
    this.weatherService
      .getConditionsFor5Days(this.city.Key)
      .subscribe((data) => {
        this.temperature5Days =
          data.DailyForecasts[4].Temperature.Maximum.Value;
        console.log(data.DailyForecasts[4].Temperature.Maximum.Value);
      });
  }

  getConditionsForYesterday() {
    this.weatherService
      .getConditionsForYesterday(this.city.Key)
      .subscribe((data) => {
        this.temperatureYesterday = data[23].Temperature.Metric.Value;
        console.log(data[23].Temperature.Metric.Value);
      });
  }
}
