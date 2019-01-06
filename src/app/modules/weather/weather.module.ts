import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import * as moment from 'moment';
import {NgxSpinnerModule} from 'ngx-spinner';

import {WeatherBoxComponent} from './weather-box/weather-box.component';
import {SearchInputComponent} from './search-input/search-input.component';
import {SuggestionsListComponent} from './suggestions-list/suggestions-list.component';
import {ForecastTabsComponent} from './forecast-tabs/forecast-tabs.component';
import {ForecastListComponent} from './forecast-list/forecast-list.component';
import {SearchComponent} from './search/search.component';

import {PressurePipe} from '../../pipes/pressure.pipe';
import {DayTimePipe} from '../../pipes/day-time.pipe';

import {WeatherService} from './weather.service';

@NgModule({
  declarations: [
    WeatherBoxComponent,
    ForecastTabsComponent,
    ForecastListComponent,
    SearchInputComponent,
    SuggestionsListComponent,
    SearchComponent,
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
  exports: [WeatherBoxComponent]
})
export class WeatherModule { }
