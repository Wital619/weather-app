import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

import {CARDINAL_POINTS} from '../consts';
import {environment} from '../../environments/environment';
import {
  Forecast,
  ForecastItem,
  ForecastWind
} from '../models/forecast.interface';

@Injectable()
export class WeatherService {
  API_URL = 'http://api.openweathermap.org/data/2.5/';

  urls = {
    find: `${this.API_URL}find?appid=${environment.api}&type=like&q=`,
    forecast: `${this.API_URL}forecast?appid=${environment.api}&q=`,
    weather: `${this.API_URL}weather?appid=${environment.api}&q=`,
  };

  constructor (private http: HttpClient,
               @Inject('moment') private moment) {}

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
      const moment = this.moment(forecastItem.dt * 1000);

      const dayIndex = moment.day();
      const dayName = moment.format('dddd');
      const dayNumber = moment.date();
      const month = moment.format('MMMM');

      if (dayIndex !== prevIndex) {
        tabData.push({ dayName, dayNumber, month });
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
