import { Component, Input, OnDestroy, OnInit} from '@angular/core';
import { WeatherService } from '../../../core/services/weather.service';
import { TabData } from '../../models/tab-data.interface';
import { ShowToastrService } from '../../../core/services/show-toastr.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forecast-tabs',
  templateUrl: './forecast-tabs.component.html',
  styleUrls: ['./forecast-tabs.component.scss']
})
export class ForecastTabsComponent implements OnInit, OnDestroy {
  @Input() tabs: TabData[];
  currentTabIndex: number = null;

  currentTabIndexSub: Subscription;

  constructor (
    private weatherService: WeatherService,
    private toastr: ShowToastrService
  ) {}

  ngOnInit () {
    this.currentTabIndexSub = this.weatherService.currentTabIndex$
      .subscribe(
        (res: number) => {
          this.currentTabIndex = res;
        },
        err => {
          this.toastr.showError('Couldn\'t get the current tab index', err);
        }
      );
  }

  ngOnDestroy () {
    this.currentTabIndexSub.unsubscribe();
  }

  onTabChange (index: number): void {
    this.weatherService.setCurrentTabIndex(index);
  }
}
