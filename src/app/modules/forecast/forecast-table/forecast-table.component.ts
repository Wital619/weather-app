import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Subscription} from 'rxjs';
import {WeatherService} from '../../../services/weather.service';
import {ShowToastrService} from '../../../services/show-toastr.service';
import {ForecastItem} from '../../../models/forecast-item.interface';

@Component({
  selector: 'app-forecast-table',
  templateUrl: './forecast-table.component.html',
  styleUrls: ['./forecast-table.component.scss']
})
export class ForecastTableComponent implements OnInit, OnChanges, OnDestroy {
  @Input() list: ForecastItem[][];
  currentList: ForecastItem[] = null;
  dayIndex: number = null;

  currentTabIndexSub: Subscription;

  constructor (
    private weatherService: WeatherService,
    private toastr: ShowToastrService
  ) {}

  ngOnInit () {
    this.currentTabIndexSub = this.weatherService.currentTabIndex$
      .subscribe(
        (res: number) => {
          this.dayIndex = res;
          this.currentList = this.list[this.dayIndex];
        },
        err => {
          this.toastr.showError('Couldn\'t get the current tab index', err);
        }
      );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.list.isFirstChange()) {
      this.list = changes.list.currentValue;
      this.currentList = this.list[this.dayIndex];
    }
  }

  ngOnDestroy () {
    this.currentTabIndexSub.unsubscribe();
  }
}
