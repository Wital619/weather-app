import {Component} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {WeatherService} from '../../../services/weather.service';

import {SelectedCity} from '../../../models/selected-city.interface';
import {ForecastCity} from '../../../models/forecast-city.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search-container.component.html',
  styleUrls: ['./search-container.component.scss']
})
export class SearchContainerComponent {
  suggestions: ForecastCity[] = [];

  constructor (
    private authService: AuthService,
    private weatherService: WeatherService,
    private firebaseDB: AngularFireDatabase,
    private router: Router
  ) {}

  setSuggestions (suggestions: ForecastCity[]): void {
    this.suggestions = suggestions;
  }

  onSelectCity (params: [SelectedCity, boolean]): void {
    const [city, isDefault] = params;

    if (isDefault) {
      this.authService.setUserCity(city)
        .then(() => {
          this.authService.setRecentCity(city)
            .then(() => {
              this.goToForecast();
            });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.authService.setRecentCity(city)
        .then(
          () => {
            this.weatherService.setRecentCity(city.id);
            this.goToForecast();
          }
        )
        .catch(err => {
          console.log(err);
        });
    }
  }

  goToForecast () {
    this.router.navigate(['./forecast']);
  }
}
