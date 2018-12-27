import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../weather.service';
import {DividedForecast} from '../../models/forecast.interface';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements OnInit {
  forecast: DividedForecast = null;

  constructor (private weatherService: WeatherService) {}

  ngOnInit () {
    this.weatherService.getForecast()
      .subscribe(
        (res: DividedForecast) => {
          this.forecast = res;
        }
      );
  }
}
