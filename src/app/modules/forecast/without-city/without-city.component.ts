import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-without-city',
  templateUrl: './without-city.component.html',
  styleUrls: ['./without-city.component.scss']
})
export class WithoutCityComponent {
  constructor(
    private router: Router
  ) {}

  goToSearch () {
    this.router.navigate(['/search']);
  }
}
