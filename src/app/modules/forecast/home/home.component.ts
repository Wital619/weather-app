import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../../../services/weather.service';
import {Weather} from '../../../models/weather.interface';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  weatherData: Weather = null;

  constructor (
    private weatherService: WeatherService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit () {
    this.spinner.show();
    this.weatherService.getCityWeather()
      .subscribe(
        (res: Weather) => {
          this.weatherData = res;
          this.spinner.hide();
        },
        err => {
          console.log(err);
          this.spinner.hide();
        }
      );
  }
}
