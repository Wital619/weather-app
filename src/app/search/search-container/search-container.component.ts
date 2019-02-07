import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { WeatherService } from '../../core/services/weather.service';
import { ShowToastrService } from '../../core/services/show-toastr.service';
import { SelectedCity } from '../../forecast/models/selected-city.interface';
import { ForecastCity } from '../../forecast/models/forecast-city.interface';

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
    private toastr: ShowToastrService,
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
        .then(
          () => {
            this.authService.setRecentCity(city)
              .then(
                () => {
                  this.toastr.showSuccess('The city has been successfully set');
                  this.goToForecast();
                },
                err => {
                  this.toastr.showError('Couldn\'t add the city to recent cities collection', err);
                }
              );
          },
          err => {
            this.toastr.showError('Couldn\'t set the city', err);
          }
        );
    } else {
      this.authService.setRecentCity(city)
        .then(
          () => {
            this.weatherService.setRecentCity(city.id);
            this.goToForecast();
          }
        )
        .catch(err => {
          this.toastr.showError('Couldn\'t add the city to recent cities collection', err);
        });
    }
  }

  goToForecast () {
    this.router.navigate(['weather', 'forecast']);
  }
}
