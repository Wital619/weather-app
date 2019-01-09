import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-wind-direction-icon',
  templateUrl: './wind-direction-icon.component.html',
  styleUrls: ['./wind-direction-icon.component.scss']
})
export class WindDirectionIconComponent implements OnChanges {
  @Input() windDirection: string;
  @Input() degree: number;

  transformStyle = null;

  ngOnChanges (changes: SimpleChanges) {
    this.transformStyle = {
      'transform': `rotate(${changes.degree.currentValue}deg)`
    };
  }
}
