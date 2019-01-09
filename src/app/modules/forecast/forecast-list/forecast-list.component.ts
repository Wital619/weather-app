import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {WeatherService} from '../../../services/weather.service';
import {Subscription} from 'rxjs';
import {ForecastItem} from '../../../models/forecast-item.interface';

@Component({
  selector: 'app-forecast-list',
  templateUrl: './forecast-list.component.html',
  styleUrls: ['./forecast-list.component.scss']
})
export class ForecastListComponent implements OnInit, OnDestroy, OnChanges {
  @Input() list: ForecastItem[][];
  currentList: ForecastItem[] = null;
  dayIndex: number = null;

  currentTabIndexSub: Subscription;

  constructor (private weatherService: WeatherService) {}

  ngOnInit () {
    this.currentTabIndexSub = this.weatherService.currentTabIndex$
      .subscribe(
        (res: number) => {
          this.dayIndex = res;
          this.currentList = this.list[res];
        },
        err => console.log(err)
      );
  }

  ngOnChanges (changes: SimpleChanges) {
    if (!changes.list.isFirstChange()) {
      this.currentList = changes.list.currentValue[this.dayIndex];
    }
  }

  ngOnDestroy () {
    this.currentTabIndexSub.unsubscribe();
  }
}
