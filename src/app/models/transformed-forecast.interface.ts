import {ForecastCity} from './forecast-city.interface';
import {TabData} from './tab-data.interface';
import {ForecastItem} from './forecast-item.interface';

export interface TransformedForecast {
  city: ForecastCity;
  tabData: TabData[];
  list: ForecastItem[][];
}
