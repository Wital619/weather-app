import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WeatherBoxComponent} from './weather-box/weather-box.component';

@NgModule({
  declarations: [
    WeatherBoxComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [WeatherBoxComponent]
})
export class WeatherModule { }
