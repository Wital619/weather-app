import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

import {WeatherService} from '../../../services/weather.service';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, map, pluck, switchMap} from 'rxjs/operators';
import {ForecastItem} from '../../../models/forecast.interface';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInput') searchInput: ElementRef;
  @Output() gotSuggestions = new EventEmitter<ForecastItem[]>();
  @Output() resetCity = new EventEmitter<void>();
  searchField: FormControl = new FormControl();

  constructor (private weatherService: WeatherService) {}

  ngOnInit () {
    this.onGotSuggestions(null);
    this.handleInputChanges()
      .subscribe(
        (res: object | null | []) => {
          this.onGotSuggestions(res);
        },
        err => {
          console.error(err);
        }
      );
  }

  ngAfterViewInit () {
    this.searchInput.nativeElement.focus();
  }

  handleInputChanges (): Observable<object | null | []> {
    return this.searchField
      .valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((searchText: string) => {
          if (!searchText.length) {
            return of(null);
          }

          if (!/^[a-zA-Z]{3,}$/.test(searchText)) {
            return of([]);
          }

          return this.weatherService.getSearchSuggestions(searchText)
            .pipe(
              pluck('list'),
              map((list: ForecastItem[]) => {
                  return list.map(item => ({
                    id: item.id,
                    name: item.name,
                    country: item.sys.country
                  }));
                }
              ));
        })
      );
  }

  onGotSuggestions (suggestions) {
    this.gotSuggestions.emit(suggestions);
  }

  onResetSelectedCity () {
    this.weatherService.resetSelectedCity();
  }
}

