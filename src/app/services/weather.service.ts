import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AngularFireDatabase} from '@angular/fire/database';
import {map, startWith, switchMap, withLatestFrom} from 'rxjs/operators';
import {Observable, of, Subject} from 'rxjs';

import {AuthService} from './auth.service';
import {environment} from '../../environments/environment';
import {CARDINAL_POINTS} from '../consts';
import {
  Forecast,
  ForecastItem,
  ForecastWind
} from '../models/forecast.interface';
import {SelectedCity} from '../models/selected-city.interface';

@Injectable()
export class WeatherService {
  private currentTabIndexSource = new Subject<number>();
  private resetSource = new Subject<void>();

  readonly reset$ = this.resetSource.asObservable();

  urls = {
    find: `http://api.openweathermap.org/data/2.5/find?appid=${environment.api}&type=like&q=`,
    forecast: `http://api.openweathermap.org/data/2.5/forecast?appid=${environment.api}&id=`,
    weather: `http://api.openweathermap.org/data/2.5/weather?appid=${environment.api}&q=`,
  };

  constructor (
    private http: HttpClient,
    private authService: AuthService,
    private firebaseDB: AngularFireDatabase,
    @Inject('moment') private moment
  ) {}

  setCurrentTabIndex (index: number): void {
    this.currentTabIndexSource.next(index);
  }

  resetSelectedCity (): void {
    this.resetSource.next();
  }

  get currentTabIndex$ () {
    return this.currentTabIndexSource
      .asObservable()
      .pipe(startWith(this.moment().day()));
  }

  getSearchSuggestions (searchText: string): Observable<object> {
    return this.http.get(`${this.urls.find}${searchText}`);
  }

  getCityForecast (cityId?: number): Observable<any[]> {
    return this.authService.getUserCity()
      .pipe(
        switchMap((res: SelectedCity | null) => {
          if (cityId || res) {
            return this.getForecast(cityId || res.id)
              .pipe(
                withLatestFrom(of(res))
              );
          } else {
            return of([null, null]);
          }
        })
      );
  }

  getForecast (cityId: number): Observable<object> {
    return this.http.get(`${this.urls.forecast}${cityId}&units=metric`).pipe(
      map((res: Forecast) => {
        const list = res.list.map((item: ForecastItem) => ({
          ...item,
          wind: this.transformDegreeToDirection(item.wind),
          weather: item.weather[0]
        }));

        return {
          city: res.city,
          ...this.getDividedForecastByDay(list)
        };
      })
    );
  }

  transformDegreeToDirection (wind: ForecastWind ): ForecastWind {
    const point = CARDINAL_POINTS.find(cardinalPoint => {
      return wind.deg >= cardinalPoint.minimumAzimuth &&
        wind.deg <= cardinalPoint.maximumAzimuth;
    });

    return {
      speed: wind.speed,
      dirText: point.dirText,
      dirMark: point.dirMark
    };
  }

  getDividedForecastByDay (forecastList: ForecastItem[]): object {
    const dividedForecastList: ForecastItem[][] = [];
    const tabData = [];
    let prevIndex: number = null;

    forecastList.forEach(forecastItem => {
      const moment = this.moment(forecastItem.dt_txt);

      const dayIndex = moment.day();
      const dayName = moment.format('dddd');
      const dayNumber = moment.date();
      const month = moment.format('MMMM');

      if (dayIndex !== prevIndex) {
        tabData.push({ dayName, dayNumber, dayIndex, month });
        dividedForecastList[dayIndex] = [].concat(forecastItem);

        prevIndex = dayIndex;
      } else {
        dividedForecastList[dayIndex].push(forecastItem);
      }
    });

    return {
      list: dividedForecastList,
      tabData
    };
  }
}
