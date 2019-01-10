import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {ShowToastrService} from '../../../services/show-toastr.service';
import {WeatherService} from '../../../services/weather.service';
import {Weather} from '../../../models/weather.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  weatherData: Weather = null;

  constructor (
    private weatherService: WeatherService,
    private spinner: NgxSpinnerService,
    private toastr: ShowToastrService
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
          this.spinner.hide();
          this.toastr.showError('Couldn\'t get the current weather', err);
        }
      );
  }
}
