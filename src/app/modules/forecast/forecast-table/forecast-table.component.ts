import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {WeatherService} from '../../../services/weather.service';
import {ShowToastrService} from '../../../services/show-toastr.service';
import {ForecastItem} from '../../../models/forecast-item.interface';

@Component({
  selector: 'app-forecast-table',
  templateUrl: './forecast-table.component.html',
  styleUrls: ['./forecast-table.component.scss']
})
export class ForecastTableComponent implements OnInit, OnDestroy {
  @Input() list: ForecastItem[][];
  currentList: ForecastItem[] = null;

  currentTabIndexSub: Subscription;

  constructor (
    private weatherService: WeatherService,
    private toastr: ShowToastrService
  ) {}

  ngOnInit () {
    this.currentTabIndexSub = this.weatherService.currentTabIndex$
      .subscribe(
        (res: number) => {
          this.currentList = this.list[res];
        },
        err => {
          this.toastr.showError('Couldn\'t get the current tab index', err);
        }
      );
  }

  ngOnDestroy () {
    this.currentTabIndexSub.unsubscribe();
  }
}
