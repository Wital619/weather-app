import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, startWith} from 'rxjs/operators';

import {CARDINAL_POINTS} from '../consts';
import {environment} from '../../environments/environment';
import {
  Forecast,
  ForecastItem,
  ForecastWind
} from '../models/forecast.interface';
import {Subject} from 'rxjs';

@Injectable()
export class WeatherService {
  private currentTabIndexSource = new Subject<number>();
  currentTabIndex$ = this.currentTabIndexSource
    .asObservable()
    .pipe(startWith(this.moment().day()));

  urls = {
    find: `http://api.openweathermap.org/data/2.5/find?appid=${environment.api}&type=like&q=`,
    forecast: `http://api.openweathermap.org/data/2.5/forecast?appid=${environment.api}&q=`,
    weather: `http://api.openweathermap.org/data/2.5/weather?appid=${environment.api}&q=`,
  };

  constructor (
    private http: HttpClient,
    @Inject('moment') private moment
  ) {}

  setCurrentTabIndex (index: number) {
    this.currentTabIndexSource.next(index);
  }

  getSearchSuggestions (searchText) {
    return this.http.get(`${this.urls.find}${searchText}`);
  }

  getForecast () {
    return this.http.get(`${this.urls.forecast}Ternopil&units=metric`).pipe(
      map((res: Forecast) => {
        const list = res.list.map((item: ForecastItem) => ({
          ...item,
          wind: this.transformDegreeToDirection(item.wind)
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

  getDividedForecastByDay (forecastList: ForecastItem[]) {
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
