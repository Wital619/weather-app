import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {WeatherService} from '../../../services/weather.service';
import {ShowToastrService} from '../../../services/show-toastr.service';
import {Subscription} from 'rxjs';
import {SelectedCity} from '../../../models/selected-city.interface';
import {ForecastCity} from '../../../models/forecast-city.interface';

@Component({
  selector: 'app-suggestions-list',
  templateUrl: './suggestions-list.component.html',
  styleUrls: ['./suggestions-list.component.scss']
})
export class SuggestionsListComponent implements OnInit, OnDestroy {
  @Input() suggestions: ForecastCity[];
  @Output() citySelected = new EventEmitter<[SelectedCity, boolean]>();

  selectedSuggestionId: number = null;
  selectedSuggestionIdSub: Subscription;

  constructor (
    private weatherService: WeatherService,
    private toastr: ShowToastrService
  ) {}

  ngOnInit () {
    this.selectedSuggestionIdSub = this.weatherService.reset$
      .subscribe(
        () => {
          this.selectedSuggestionId = null;
        },
        err => {
          this.toastr.showError('Couldn\'t reset the city suggestions', err);
        }
      );
  }

  onSelectSuggestion (suggestionId: number): void {
    this.selectedSuggestionId = suggestionId === this.selectedSuggestionId
      ? null
      : suggestionId;
  }

  onSelectCity (isDefault: boolean) {
    const selectedCity = this.suggestions.find(city => city.id === this.selectedSuggestionId);

    const params = {
      id: selectedCity.id,
      name: selectedCity.name,
    };

    this.citySelected.emit([params, isDefault]);
  }

  ngOnDestroy () {
    this.selectedSuggestionIdSub.unsubscribe();
  }
}
