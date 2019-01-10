import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {AuthUser} from './models/auth-user.interface';
import {ShowToastrService} from './services/show-toastr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  authUser: AuthUser = null;
  justifyContent = null;

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
          this.justifyContent = this.router.url === '/forecast' ? null : 'center';

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
        this.router.navigate(['/login']);
      })
      .catch(err => {
        this.toastr.showError('Couldn\'t sign out', err);
      });
  }
}
