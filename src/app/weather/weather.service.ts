import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';

@Injectable()
export class WeatherService {
  API_URL = 'http://api.openweathermap.org/data/2.5/';

  urls = {
    find: `${this.API_URL}find?appid=${environment.api}&type=like&q=`,
    forecast: `${this.API_URL}forecast?appid=${environment.api}&q=`,
    weather: `${this.API_URL}weather?appid=${environment.api}&q=`,
  };

  constructor (private http: HttpClient) {}

  getSearchSuggestions (searchText) {
    return this.http.get(`${this.urls.find}${searchText}`);
  }
}
