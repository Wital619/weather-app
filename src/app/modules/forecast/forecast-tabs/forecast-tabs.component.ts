import {Component, Input} from '@angular/core';
import {WeatherService} from '../../../services/weather.service';
import {TabData} from '../../../models/tab-data.interface';

@Component({
  selector: 'app-forecast-tabs',
  templateUrl: './forecast-tabs.component.html',
  styleUrls: ['./forecast-tabs.component.scss']
})
export class ForecastTabsComponent {
  @Input() tabs: TabData[];
  currentTabIndex: number = null;

  constructor (private weatherService: WeatherService) {
    this.weatherService.currentTabIndex$
      .subscribe((res: number) => {
        this.currentTabIndex = res;
      });
  }

  onTabChange (index: number): void {
    this.weatherService.setCurrentTabIndex(index);
  }
}
