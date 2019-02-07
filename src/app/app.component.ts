import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './core/services/auth.service';
import { ShowToastrService } from './core/services/show-toastr.service';
import { AuthUser } from './auth/models/auth-user.interface';

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
    private spinner: NgxSpinnerService,
    private toastr: ShowToastrService
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
          this.toastr.showError('Couldn\'t authenticate you', err);
        }
      );
  }

  doSignOut (): void {
    this.authService.doSignOut()
      .then(() => {
        this.toastr.showSuccess('Now you are logged out');
        this.router.navigate(['/auth']);
      })
      .catch(err => {
        this.toastr.showError('Couldn\'t sign out', err);
      });
  }

  getJustifyContent () {
    return this.router.url === '/weather/forecast' ? null : 'center';
  }
}
