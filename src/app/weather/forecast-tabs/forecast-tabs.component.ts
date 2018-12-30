import {Component, Input} from '@angular/core';
import {TabData} from '../../models/forecast.interface';
import {WeatherService} from '../weather.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-forecast-tabs',
  templateUrl: './forecast-tabs.component.html',
  styleUrls: ['./forecast-tabs.component.scss']
})
export class ForecastTabsComponent {
  @Input() tabs: TabData[];
  currentTabIndex: number = null;

  constructor(private weatherService: WeatherService) {
    this.weatherService.currentTabIndex$
      .subscribe((res: number) => {
        this.currentTabIndex = res;
      });
  }

  onTabChange (index: number) {
    this.weatherService.setCurrentTabIndex(index);
  }
}
