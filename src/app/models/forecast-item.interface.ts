import {ForecastMain} from './forecast-main.interface';
import {ForecastWeather} from './forecast-weather.interface';
import {ForecastWind} from './forecast-wind.interface';

export interface ForecastItem {
  id: number;
  name: string;
  clouds: { all: number };
  dt: number;
  dt_txt: string;
  main: ForecastMain;
  sys: { country: string };
  weather: ForecastWeather;
  wind: ForecastWind;
}
