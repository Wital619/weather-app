import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ForecastItem} from '../../../models/forecast.interface';
import {WeatherService} from '../../../services/weather.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-forecast-list',
  templateUrl: './forecast-list.component.html',
  styleUrls: ['./forecast-list.component.scss']
})
export class ForecastListComponent implements OnInit, OnDestroy {
  @Input() list: ForecastItem[][];
  currentList: ForecastItem[] = null;

  currentTabIndexSub: Subscription;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.currentTabIndexSub = this.weatherService.currentTabIndex$
      .subscribe(
        (res: number) => {
          this.currentList = this.list[res];
        },
        err => console.log(err)
      );
  }

  ngOnDestroy() {
    this.currentTabIndexSub.unsubscribe();
  }
}
