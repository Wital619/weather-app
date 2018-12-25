import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {Router} from '@angular/router';
import {AuthUser} from './models/auth-user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthService]
})
export class AppComponent implements OnInit {
  authUser: AuthUser = null;

  constructor (private authService: AuthService,
               private router: Router) {}

  ngOnInit() {
    this.authService.authUser$
      .subscribe(
        (res: AuthUser | null) => {
          this.authUser = res;
        },
        err => {
          console.error(err);
        }
      );
  }

  async doSignOut () {
    try {
      await this.authService.doSignOut();
      this.router.navigate(['/login']);
    } catch (err) {
      console.error('Couldn\'t sign out');
    }
  }
}
