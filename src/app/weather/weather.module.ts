import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import * as moment from 'moment';
import {NgxSpinnerModule} from 'ngx-spinner';

import {WeatherService} from './weather.service';

import {WeatherBoxComponent} from './weather-box/weather-box.component';
import {SearchComponent} from './search/search.component';
import {SuggestionsComponent} from './suggestions/suggestions.component';
import {ForecastTabsComponent} from './forecast-tabs/forecast-tabs.component';
import {ForecastListComponent} from './forecast-list/forecast-list.component';

import {PressurePipe} from '../pipes/pressure.pipe';
import {DayNamePipe} from '../pipes/day-name.pipe';

@NgModule({
  declarations: [
    WeatherBoxComponent,
    SearchComponent,
    SuggestionsComponent,
    ForecastTabsComponent,
    ForecastListComponent,
    PressurePipe,
    DayNamePipe
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
