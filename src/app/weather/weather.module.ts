import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import * as moment from 'moment';

import {WeatherService} from './weather.service';

import {WeatherBoxComponent} from './weather-box/weather-box.component';
import {SearchComponent} from './search/search.component';
import {SuggestionsComponent} from './suggestions/suggestions.component';
import {WeatherForecastComponent} from './weather-forecast/weather-forecast.component';

import {PressurePipe} from '../pipes/pressure.pipe';

@NgModule({
  declarations: [
    WeatherBoxComponent,
    SearchComponent,
    SuggestionsComponent,
    WeatherForecastComponent,
    PressurePipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
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
