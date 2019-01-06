import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ForecastCity} from '../../../models/forecast.interface';
import {WeatherService} from '../weather.service';
import {Subscription} from 'rxjs';
import {SelectedCity} from '../../../models/selected-city.interface';

@Component({
  selector: 'app-suggestions-list',
  templateUrl: './suggestions-list.component.html',
  styleUrls: ['./suggestions-list.component.scss']
})
export class SuggestionsListComponent implements OnInit, OnDestroy {
  @Input() suggestions: ForecastCity[];
  @Output() citySelected = new EventEmitter<SelectedCity>();

  selectedSuggestionId: number = null;
  selectedSuggestionIdSub: Subscription;

  constructor (private weatherService: WeatherService) {}

  ngOnInit () {
    this.selectedSuggestionIdSub = this.weatherService.reset$
      .subscribe(() => {
        this.selectedSuggestionId = null;
      });
  }

  onSelectSuggestion (suggestionId: number): void {
    this.selectedSuggestionId = suggestionId === this.selectedSuggestionId
      ? null
      : suggestionId;
  }

  onSelectCity (isDefault: boolean) {
    this.citySelected.emit({
      id: this.selectedSuggestionId,
      isDefault
    });
  }

  ngOnDestroy () {
    this.selectedSuggestionIdSub.unsubscribe();
  }
}
