import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Router} from '@angular/router';
import {AuthUser} from '../../../models/auth-user.interface';
import {AuthService} from '../../../auth.service';
import {SelectedCity} from '../../../models/selected-city.interface';
import {WeatherService} from '../weather.service';
import {empty, Observable} from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  suggestions: object[] = [];
  isFetched = false;

  constructor (
    private authService: AuthService,
    private weatherService: WeatherService,
    private firebaseDB: AngularFireDatabase,
    private router: Router
  ) {}

  ngOnInit () {
  }

  setSuggestions (suggestions: object[]): void {
    this.suggestions = suggestions;
  }

  onSelectCity (city: SelectedCity): void {
    if (city.isDefault) {
      this.authService.setUserCity(city.id)
        .then(
          () => {
            this.isFetched = false;
            this.router.navigate(['/weather']);
          },
          err => {
            console.log(err);
          }
        );
    } else {
      this.isFetched = true;
    }
  }
}
