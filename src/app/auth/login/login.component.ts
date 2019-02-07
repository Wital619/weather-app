import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ShowToastrService } from '../../core/services/show-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';

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

  constructor(
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private toastr: ShowToastrService
  ) {}

  doLogin (isFormValid: boolean): void {
    if (isFormValid) {
      this.spinner.show();
      this.authService.loginByEmailAndPassword(this.userData)
        .then(
          () => {
            this.toastr.showSuccess('Successfully logged in');
            this.goToWeather();
          },
          err => {
            const errMessage = err.message || 'Couldn\'t login with email and password';
            this.toastr.showError(errMessage, err);
            this.spinner.hide();
          }
        );
    }
  }

  doFacebookLogin (): void {
    this.authService.loginByFacebook()
      .then(
        () => {
          this.toastr.showSuccess('Successfully logged in');
          this.goToWeather();
        },
        err => {
          const errMessage = err.message || 'Couldn\'t login with Facebook';
          this.toastr.showError(errMessage, err);
        }
      );
  }

  doGoogleLogin (): void {
    this.authService.loginByGoogle()
      .then(
        () => {
          this.toastr.showSuccess('Successfully logged in');
          this.goToWeather();
        },
        err => {
          const errMessage = err.message || 'Couldn\'t login with Google';
          this.toastr.showError(errMessage, err);
        }
      );
  }

  goToWeather (): void {
    this.router.navigate(['/weather']);
  }
}
