import { Component } from '@angular/core';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthService]
})
export class AppComponent {
  constructor (private authService: AuthService) {}

  doSignOut () {
    this.authService.doSignOut();
  }
}
