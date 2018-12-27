export interface Forecast  {
  city: ForecastCity;
  list: ForecastItem[];
}

interface ForecastCity {
  country: string;
  name: string;
  population: number;
}

export interface ForecastItem {
  clouds: { all: number };
  dt: number;
  dt_txt: string;
  main: ForecastMain;
  rain: { '3h': number; };
  snow: { '3h': number; };
  sys: { pod: string };
  weather: ForecastWeather[];
  wind: ForecastWind;
}

interface ForecastMain {
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: number;
  temp_kf: number;
  temp_max: number;
  temp_min: number;
}

interface ForecastWeather {
  main: string;
  description: string;
  icon: string;
}

export interface ForecastWind {
  speed: number;
  dirText: string;
  dirMark: string;
  deg?: number;
}

export interface DividedForecast {
  city: ForecastCity;
  tabData: {
    dayName: string;
    dayNumber: number;
    month: number;
  }[];
  list: ForecastItem[][];
}
