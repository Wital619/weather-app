import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {map} from 'rxjs/operators';

@Injectable()
export class HideLoginGuardService implements CanActivate {
  constructor (private router: Router,
               private firebaseAuth: AngularFireAuth) {}

  canActivate (): Observable<boolean> {
    return this.firebaseAuth.authState
      .pipe(
        map(user => {
          if (user) {
            this.router.navigate(['/home']);

            return false;
          }

          return true;
        })
      );
  }
}
