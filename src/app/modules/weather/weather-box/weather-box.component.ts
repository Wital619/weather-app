import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {Subscription} from 'rxjs';
import {WeatherService} from '../weather.service';
import {
  DividedForecast,
  ForecastCity,
  ForecastItem,
  TabData
} from '../../../models/forecast.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-weather-box',
  templateUrl: './weather-box.component.html',
  styleUrls: ['./weather-box.component.scss']
})
export class WeatherBoxComponent implements OnInit, OnDestroy {
  list: ForecastItem[][] = [];
  tabs: TabData[] = [];
  city: ForecastCity = null;

  isUserSetCity = false;

  forecastSub: Subscription;

  constructor (
    private weatherService: WeatherService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit () {
    this.spinner.show();
    this.forecastSub = this.weatherService.handleUserCity()
      .subscribe(
        (res: DividedForecast) => {
          if (res) {
            this.tabs = res.tabData;
            this.list = res.list;
            this.city = res.city;

            this.isUserSetCity = true;
          } else {
            this.isUserSetCity = false;
          }

          this.spinner.hide();
        },
        err => {
          console.log(err);
          this.spinner.hide();
        }
      );
  }

  goToSearch () {
    this.router.navigate(['/search']);
  }

  ngOnDestroy () {
    this.forecastSub.unsubscribe();
  }
}
