import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ForecastRoutingModule } from './forecast-routing.module';

import { ForecastContainerComponent } from './components/forecast-container/forecast-container.component';
import { ForecastTabsComponent } from './components/forecast-tabs/forecast-tabs.component';
import { ForecastTableComponent } from './components/forecast-table/forecast-table.component';
import { HomeComponent } from './components/home/home.component';
import { WeatherIconComponent } from './components/icons/weather-icon/weather-icon.component';
import { WindDirectionIconComponent } from './components/icons/wind-direction-icon/wind-direction-icon.component';
import { CountryIconComponent } from './components/icons/country-icon/country-icon.component';
import { WithoutCityComponent } from './components/without-city/without-city.component';
import { PressurePipe } from '../shared/pipes/pressure.pipe';

@NgModule({
  imports: [
    CommonModule,
    NgxSpinnerModule,
    ForecastRoutingModule
  ],
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
  exports: [
    ForecastContainerComponent
  ]
})
export class ForecastModule { }
