import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import * as moment from 'moment';
import {NgxSpinnerModule} from 'ngx-spinner';

import {ForecastContainerComponent} from './forecast-container/forecast-container.component';
import {ForecastTabsComponent} from './forecast-tabs/forecast-tabs.component';
import {ForecastTableComponent} from './forecast-table/forecast-table.component';
import {HomeComponent} from './home/home.component';
import {WeatherIconComponent} from './icons/weather-icon/weather-icon.component';
import {WindDirectionIconComponent} from './icons/wind-direction-icon/wind-direction-icon.component';
import {CountryIconComponent} from './icons/country-icon/country-icon.component';
import {WithoutCityComponent} from './without-city/without-city.component';

import {PressurePipe} from '../../pipes/pressure.pipe';

import {WeatherService} from '../../services/weather.service';
import {UtilityService} from '../../services/utility.service';

@NgModule({
  declarations: [
    ForecastContainerComponent,
    ForecastTabsComponent,
    ForecastTableComponent,
    WeatherIconComponent,
    WindDirectionIconComponent,
    CountryIconComponent,
    HomeComponent,
    WithoutCityComponent,
    PressurePipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  providers: [
    {
      provide: 'moment', useFactory: (): any => moment
    },
    WeatherService,
    UtilityService
  ],
  exports: [ForecastContainerComponent]
})
export class ForecastModule { }
