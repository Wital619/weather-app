import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {Subject} from 'rxjs';
import {WeatherService} from '../../../services/weather.service';
import {
  DividedForecast,
  ForecastCity,
  ForecastItem,
  TabData
} from '../../../models/forecast.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {takeUntil} from 'rxjs/operators';
import {SelectedCity} from '../../../models/selected-city.interface';

@Component({
  selector: 'app-forecast-container',
  templateUrl: './forecast-container.component.html',
  styleUrls: ['./forecast-container.component.scss']
})
export class ForecastContainerComponent implements OnInit, OnDestroy {
  list: ForecastItem[][] = [];
  tabs: TabData[] = [];
  city: ForecastCity = null;

  recentCityId = null;
  recentCities: SelectedCity[] = [];
  userCity: SelectedCity = null;

  destroy = new Subject<void>();

  constructor (
    private authService: AuthService,
    private weatherService: WeatherService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {
    this.getRecentCityId();
  }

  ngOnInit () {
    this.spinner.show();

    this.getUserCities();
    this.getCityForecast();
  }

  getRecentCityId (): void {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.destroy))
      .subscribe(
        res => {
          this.recentCityId = res['cityId'] || null;
        }
      );
  }

  getUserCities (): void {
    this.authService.getUserCities()
      .pipe(takeUntil(this.destroy))
      .subscribe((res: SelectedCity[] | null) => {
        this.recentCities = res;
      });
  }

  getCityForecast (cityId?: number): void {
    this.weatherService.getCityForecast(cityId || this.recentCityId)
      .subscribe(
        (res: [DividedForecast, SelectedCity]) => {
          const [forecast, userCity] = res;

          if (forecast) {
            this.tabs = forecast.tabData;
            this.list = forecast.list;
            this.city = forecast.city;
          }

          this.userCity = userCity;

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
