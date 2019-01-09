import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {Subject} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';
import {WeatherService} from '../../../services/weather.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {SelectedCity} from '../../../models/selected-city.interface';
import {ForecastItem} from '../../../models/forecast-item.interface';
import {TabData} from '../../../models/tab-data.interface';
import {ForecastCity} from '../../../models/forecast-city.interface';
import {TransformedForecast} from '../../../models/transformed-forecast.interface';

@Component({
  selector: 'app-forecast-container',
  templateUrl: './forecast-container.component.html',
  styleUrls: ['./forecast-container.component.scss']
})
export class ForecastContainerComponent implements OnInit, OnDestroy {
  list: ForecastItem[][] = [];
  tabs: TabData[] = [];
  city: ForecastCity = null;

  cityIdFromSearch = null;
  recentCities: SelectedCity[] = [];
  userCity: SelectedCity = null;

  destroy = new Subject<void>();

  constructor (
    private authService: AuthService,
    private weatherService: WeatherService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit () {
    this.getCityFromSearch();
    this.getUserCities();
    this.getCityForecast();
  }

  getCityFromSearch (): void {
    this.weatherService.recentCityId$
      .pipe(
        take(1),
        takeUntil(this.destroy)
      )
      .subscribe(
        (res: number) => {
          console.log(res);
          this.cityIdFromSearch = res;
        }
      );
  }

  getUserCities (): void {
    this.authService.getUserCities()
      .pipe(takeUntil(this.destroy))
      .subscribe((res: SelectedCity[]) => {
        this.recentCities = res;
      });
  }

  getCityForecast (cityIdFromClick?: number): void {
    this.spinner.show();

    this.weatherService.getCityForecast(cityIdFromClick || this.cityIdFromSearch)
      .subscribe(
        (res: [TransformedForecast, SelectedCity]) => {
          const [forecast, userCity] = res;

          if (forecast) {
            this.tabs = forecast.tabData;
            this.city = forecast.city;
            this.list = forecast.list;
          }

          this.userCity = userCity;

          if (this.cityIdFromSearch) {
            this.weatherService.setRecentCity(null);
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
    this.destroy.next();
    this.destroy.complete();
  }
}
