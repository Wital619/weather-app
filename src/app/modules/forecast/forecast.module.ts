import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import * as moment from 'moment';
import {NgxSpinnerModule} from 'ngx-spinner';

import {ForecastContainerComponent} from './forecast-container/forecast-container.component';
import {ForecastTabsComponent} from './forecast-tabs/forecast-tabs.component';
import {ForecastListComponent} from './forecast-list/forecast-list.component';
import {HomeComponent} from './home/home.component';

import {PressurePipe} from '../../pipes/pressure.pipe';
import {DayTimePipe} from '../../pipes/day-time.pipe';

import {WeatherService} from '../../services/weather.service';

@NgModule({
  declarations: [
    ForecastContainerComponent,
    ForecastTabsComponent,
    ForecastListComponent,
    HomeComponent,
    PressurePipe,
    DayTimePipe
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
    WeatherService
  ],
  exports: [ForecastContainerComponent]
})
export class ForecastModule { }
