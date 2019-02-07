import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-wind-direction-icon',
  templateUrl: './wind-direction-icon.component.html',
  styleUrls: ['./wind-direction-icon.component.scss']
})
export class WindDirectionIconComponent implements OnInit {
  @Input() windDirection: string;
  @Input() degree: number;

  transformStyle = null;

  ngOnInit(): void {
    if (this.degree) {
      this.transformStyle = {
        'transform': `rotate(${this.degree}deg)`
      };
    } else {
      this.transformStyle = {
        'display': `none`
      };
    }
  }
}
