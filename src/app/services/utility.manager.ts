import {Inject, Injectable} from '@angular/core';
import {CARDINAL_POINTS} from '../consts';
import {ForecastWind} from '../models/forecast-wind.interface';
import {ForecastItem} from '../models/forecast-item.interface';
import {Weather} from '../models/weather.interface';
import {Forecast} from '../models/forecast.interface';

@Injectable()
export class UtilityManager {
  constructor (@Inject('moment') private moment) {}

  transformForecast (forecast: Forecast) {
    const list = forecast.list.map((item: ForecastItem) => {
      return this.transformWeatherData(item);
    });

    return {
      city: forecast.city,
      ...this.getDividedForecastByDay(list)
    };
  }

  transformWeatherData (weatherData: Weather | ForecastItem): Weather | ForecastItem {
    return {
      ...weatherData,
      weather: weatherData.weather[0],
      wind: this.transformDegreeToDirection(weatherData.wind)
    };
  }

  transformDegreeToDirection (wind: ForecastWind ): ForecastWind {
    const point = CARDINAL_POINTS.find(cardinalPoint => {
      return wind.deg >= cardinalPoint.minimumAzimuth &&
        wind.deg <= cardinalPoint.maximumAzimuth;
    });

    return {
      ...wind,
      dirText: point.dirText
    };
  }

  getDividedForecastByDay (forecastList: any[]): object {
    const transformedForecastList: ForecastItem[][] = [];
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
        transformedForecastList[dayIndex] = [].concat(forecastItem);

        prevIndex = dayIndex;
      } else {
        transformedForecastList[dayIndex].push(forecastItem);
      }
    });

    return {
      list: transformedForecastList,
      tabData
    };
  }
}
