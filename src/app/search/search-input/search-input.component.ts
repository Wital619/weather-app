import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  AfterViewInit,
  Output,
  ViewChild
} from '@angular/core';
import { WeatherService } from '../../core/services/weather.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, pluck, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ForecastItem } from '../../forecast/models/forecast-item.interface';
import { ForecastCity } from '../../forecast/models/forecast-city.interface';
import { ShowToastrService } from '../../core/services/show-toastr.service';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInput') searchInput: ElementRef;
  @Output() gotSuggestions = new EventEmitter<ForecastCity[]>();
  @Output() resetCity = new EventEmitter<void>();
  searchField: FormControl = new FormControl();

  constructor (
    private weatherService: WeatherService,
    private toastr: ShowToastrService
  ) {}

  ngOnInit () {
    this.onGotSuggestions(null);
    this.handleInputChanges()
      .subscribe(
        (res: ForecastCity[] | null | []) => {
          this.onGotSuggestions(res);
        },
        err => {
          this.toastr.showError('Couldn\'t get the city suggestions', err);
        }
      );
  }

  ngAfterViewInit () {
    this.searchInput.nativeElement.focus();
  }

  handleInputChanges (): Observable<ForecastCity[] | null | []> {
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

  onGotSuggestions (suggestions: ForecastCity[]): void {
    this.gotSuggestions.emit(suggestions);
  }

  onResetSelectedCity (): void {
    this.weatherService.resetSelectedCity();
  }
}

