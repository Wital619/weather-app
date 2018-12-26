import {Component} from '@angular/core';

@Component({
  selector: 'app-weather-box',
  templateUrl: './weather-box.component.html',
  styleUrls: ['./weather-box.component.scss']
})
export class WeatherBoxComponent {
  suggestions: object[] = [];

  getSuggestions (suggestions: object[]) {
    this.suggestions = suggestions;
  }
}
