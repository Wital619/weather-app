import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

import {WeatherService} from './weather.service';

import {WeatherBoxComponent} from './weather-box/weather-box.component';
import {SearchComponent} from './search/search.component';
import {SuggestionsComponent} from './suggestions/suggestions.component';

@NgModule({
  declarations: [
    WeatherBoxComponent,
    SearchComponent,
    SuggestionsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [WeatherService],
  exports: [WeatherBoxComponent]
})
export class WeatherModule { }
