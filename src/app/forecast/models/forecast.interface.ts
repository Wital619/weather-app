import { ForecastItem } from './forecast-item.interface';
import { ForecastCity } from './forecast-city.interface';

export interface Forecast  {
  city: ForecastCity;
  list: ForecastItem[];
}
