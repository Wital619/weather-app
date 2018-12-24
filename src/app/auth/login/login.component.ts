import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) {}

  ngOnInit() {
  }

  loginByEmailAndPassword () {
    this.authService.doLogin(1, 2);
  }

  loginByFacebook () {
    this.authService.doFacebookLogin()
      .then(
        () => this.router.navigate(['/weather']),
        err => console.log('Couldn\'t login by facebook', err)
      );
  }

  loginByGoogle () {
    this.authService.doGoogleLogin()
      .then(
        () => this.router.navigate(['/weather']),
        err => console.log('Couldn\'t login by facebook', err)
      );
  }
}
