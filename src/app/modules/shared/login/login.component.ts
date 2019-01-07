import {Component} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userData = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService,
              private router: Router) {}

  doLogin () {
    this.authService.loginByEmailAndPassword(this.userData)
      .then(
        () => {
          this.navigateToWeather();
        },
        err => {
          console.error('Couldn\'t login by email and password', err);
        }
      );
  }

  doFacebookLogin () {
    this.authService.loginByFacebook()
      .then(
        () => {
          this.navigateToWeather();
        },
        err => {
          console.error('Couldn\'t login by Facebook', err);
        }
      );
  }

  doGoogleLogin () {
    this.authService.loginByGoogle()
      .then(
        () => {
          this.navigateToWeather();
        },
        err => {
          console.error('Couldn\'t login by Google', err);
        }
      );
  }

  navigateToWeather () {
    this.router.navigate(['/forecast']);
  }
}
