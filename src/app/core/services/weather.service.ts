import { Inject , Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map , startWith, switchMap, withLatestFrom} from 'rxjs/operators';
import { Observable , of, ReplaySubject, Subject} from 'rxjs';
import { AuthService } from './auth.service';
import { UtilityService } from './utility.service';
import { Forecast } from '../../forecast/models/forecast.interface';
import { SelectedCity } from '../../forecast/models/selected-city.interface';
import { Weather } from '../../forecast/models/weather.interface';
import { environment } from '../../../environments/environment';

const URLS = {
  find: `https://api.openweathermap.org/data/2.5/find?appid=${environment.api}&type=like&q=`,
  forecast: `https://api.openweathermap.org/data/2.5/forecast?appid=${environment.api}&units=metric&id=`,
  weather: `https://api.openweathermap.org/data/2.5/weather?appid=${environment.api}&units=metric&id=`,
};

@Injectable()
export class WeatherService {
  private currentTabIndexSource = new Subject<number>();
  private resetSource = new Subject<void>();
  private recentCityIdSource = new ReplaySubject<number>(1);

  readonly reset$: Observable<void> = this.resetSource.asObservable();
  readonly recentCityId$: Observable<number> = this.recentCityIdSource.asObservable();

  constructor (
    private http: HttpClient,
    private authService: AuthService,
    private utilityService: UtilityService,
    @Inject('moment') private moment
  ) {}

  setCurrentTabIndex (index: number): void {
    this.currentTabIndexSource.next(index);
  }

  setRecentCity (cityId: number): void {
    this.recentCityIdSource.next(cityId);
  }

  resetSelectedCity (): void {
    this.resetSource.next();
  }

  get currentTabIndex$ (): Observable<number> {
    return this.currentTabIndexSource
      .asObservable()
      .pipe(startWith(this.moment().day()));
  }

  getSearchSuggestions (searchText: string): Observable<object> {
    return this.http.get(`${URLS.find}${searchText}`);
  }

  getWeather (cityId: number): Observable<object> {
    return this.http.get(`${URLS.weather}${cityId}`);
  }

  getForecast (cityId: number): Observable<object> {
    return this.http.get(`${URLS.forecast}${cityId}`);
  }

  getCityForecast (cityId: number): Observable<any[]> {
    return this.authService.getUserCity()
      .pipe(
        switchMap((res: SelectedCity) => {
          if (cityId || res) {
            return this.getForecast(cityId || res.id)
              .pipe(
                map((forecast: Forecast) => {
                  return this.utilityService.transformForecast(forecast);
                }),
                withLatestFrom(of(res))
              );
          } else {
            return of([null, null]);
          }
        })
      );
  }

  getCityWeather (): Observable<Weather> {
    return this.authService.getUserCity()
      .pipe(
        switchMap((res: SelectedCity) => {
          if (res) {
            return this.getWeather(res.id).pipe(
              map((weatherData: Weather) => {
                return this.utilityService.transformWeatherData(weatherData);
              })
            );
          } else {
            return of(null);
          }
        })
      );
  }
}
