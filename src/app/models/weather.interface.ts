import {ForecastMain} from './forecast-main.interface';
import {ForecastWeather} from './forecast-weather.interface';
import {ForecastWind} from './forecast-wind.interface';

export interface Weather {
  id: number;
  name: string;
  clouds: { all: number };
  dt: number;
  main: ForecastMain;
  sys: {
    country: string,
    sunrise: number;
    sunset: number;
  };
  weather: ForecastWeather;
  wind: ForecastWind;
}
