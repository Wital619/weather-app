import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-country-icon',
  templateUrl: './country-icon.component.html',
  styleUrls: ['./country-icon.component.scss']
})
export class CountryIconComponent {
  @Input() countrySign: string;
}
