import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {WeatherService} from '../weather.service';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, filter, pluck, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output() gotSuggestions = new EventEmitter<object[]>();
  searchField: FormControl = new FormControl();

  constructor (private weatherService: WeatherService) {}

  ngOnInit () {
    this.searchField
      .valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter((searchText: string) => /^[a-zA-Z]{3,}$/.test(searchText)),
        switchMap((searchText: string) => {
          return this.weatherService.getSearchSuggestions(searchText)
            .pipe(pluck('list'));
        })
      )
      .subscribe(
        (res: object[]) => {
          this.onGotSuggestions(res);
        },
        err => {
          console.error(`An error was occurred: ${err}`);
        }
      );
  }

  onGotSuggestions (suggestions: object[]) {
    this.gotSuggestions.emit(suggestions);
  }
}

