import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { take , takeUntil} from 'rxjs/operators';
import { WeatherService } from '../../../core/services/weather.service';
import { AuthService } from '../../../core/services/auth.service';
import { ShowToastrService } from '../../../core/services/show-toastr.service';
import { SelectedCity } from '../../models/selected-city.interface';
import { ForecastItem } from '../../models/forecast-item.interface';
import { TabData } from '../../models/tab-data.interface';
import { ForecastCity } from '../../models/forecast-city.interface';
import { TransformedForecast } from '../../models/transformed-forecast.interface';

@Component({
  selector: 'app-forecast-container',
  templateUrl: './forecast-container.component.html',
  styleUrls: ['./forecast-container.component.scss']
})
export class ForecastContainerComponent implements OnInit, OnDestroy {
  isLoading = false;
  list: ForecastItem[][] = [];
  tabs: TabData[] = [];
  city: ForecastCity = null;

  cityIdFromSearch = null;
  recentCities: SelectedCity[] = [];
  userCity: SelectedCity = null;

  private destroy = new Subject<void>();

  constructor (
    private authService: AuthService,
    private weatherService: WeatherService,
    private spinner: NgxSpinnerService,
    private toastr: ShowToastrService
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
          this.cityIdFromSearch = res;
        },
        err => {
          this.toastr.showError('Search failed', err);
        }
      );
  }

  getUserCities (): void {
    this.authService.getUserCities()
      .pipe(takeUntil(this.destroy))
      .subscribe(
        (res: SelectedCity[]) => {
          this.recentCities = res;
        },
        err => {
          this.toastr.showError('Couldn\'t get cities list from database', err);
        }
      );
  }

  getCityForecast (cityIdFromClick?: number): void {
    this.spinner.show();
    this.isLoading = true;

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
          this.isLoading = false;
        },
        err => {
          this.spinner.hide();
          this.toastr.showError('Couldn\'t get the city forecast', err);
        }
      );
  }

  ngOnDestroy () {
    this.destroy.next();
    this.destroy.complete();
  }
}
