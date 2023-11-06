import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { City } from '../interfaces/city.interface';
import { environment } from 'src/environments/environment.development';
import { Forecast, ForecastHour, Weather } from '../interfaces/weather.interface';
import { ENDPOINTS } from '../constants/Endpoints.const';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}     

  getLocations(q: string): Observable<City[]> {
    return this.http.get<City[]>(
      environment.weatherBaseUrl + ENDPOINTS.AUTOCOMPLETE_ENDPOINT + environment.weatherAPIKey + '&q=' + q
    );
  }

  getCurrentConditions(cityKey: string) : Observable<Weather[]>{
    return this.http.get<Weather[]>(environment.weatherBaseUrl+ENDPOINTS.CURRENT_CONDITIONS_ENDPOINT+cityKey+environment.weatherAPIKey);
  }

  getConditionsIn1Hour(cityKey: string) : Observable<ForecastHour[]> {
    return this.http.get<ForecastHour[]>(environment.weatherBaseUrl + ENDPOINTS.ONE_HOUR_FORECAST_ENDPOINT + cityKey + environment.weatherAPIKey+"&metric=true")
  } 

  getConditionsIn12Hours(cityKey: string) : Observable<ForecastHour[]> {
    return this.http.get<ForecastHour[]>(environment.weatherBaseUrl+ENDPOINTS.TWELVE_HOUR_FORECAST_ENDPOINT+cityKey+environment.weatherAPIKey+"&metric=true")
  }

  getConditionsForTomorrow(cityKey: string) : Observable<Forecast> {
    return this.http.get<Forecast>(environment.weatherBaseUrl+ENDPOINTS.TOMORROW_ENDPOINT+cityKey+environment.weatherAPIKey+"&metric=true")
  }

  getConditionsFor5Days(cityKey: string) : Observable<Forecast> {
    return this.http.get<Forecast>(environment.weatherBaseUrl+ENDPOINTS.FIVE_DAYS_ENDPOINT+cityKey + environment.weatherAPIKey+"&metric=true")
  }

  getConditionsForYesterday(cityKey: string) : Observable<Weather[]> {
    return this.http.get<Weather[]>(environment.weatherBaseUrl+ENDPOINTS.CURRENT_CONDITIONS_ENDPOINT+cityKey+ENDPOINTS.YESTERDAY_ENDPOINT+environment.weatherAPIKey)
  }
}
