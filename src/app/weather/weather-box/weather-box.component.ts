import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../weather.service';
import {DividedForecast, ForecastCity, ForecastItem, TabData} from '../../models/forecast.interface';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-weather-box',
  templateUrl: './weather-box.component.html',
  styleUrls: ['./weather-box.component.scss']
})
export class WeatherBoxComponent implements OnInit {
  forecastList: ForecastItem[][] = [];
  tabs: TabData[] = [];
  city: ForecastCity = null;

  constructor (
    private weatherService: WeatherService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit () {
    this.spinner.show();
    this.weatherService.getForecast()
      .subscribe(
        (res: DividedForecast) => {
          this.tabs = res.tabData;
          this.forecastList = res.list;
          this.city = res.city;
          this.spinner.hide();
        },
        err => {
          console.log(err);
          this.spinner.hide();
        }
      );
  }
}
