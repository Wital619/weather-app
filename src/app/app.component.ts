import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {AuthUser} from './models/auth-user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  authUser: AuthUser = null;

  constructor (
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.authService.getAuthState()
      .subscribe(
        user => {
          if (user) {
            this.authUser = {
              id: user.uid,
              email: user.email,
              displayName: user.displayName
            };
            this.authService.authUser = this.authUser;
            this.spinner.hide();
          } else {
            this.authUser = null;
            this.authService.authUser = null;
            this.spinner.hide();
          }
        },
        err => {
          console.log(err);
        }
      );
  }

  doSignOut () {
    this.authService.doSignOut()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(err => {
        console.error('Couldn\'t sign out', err);
      });
  }
}
