import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {Subject} from 'rxjs';

import {AuthUser} from '../models/auth-user.interface';
import UserCredential = firebase.auth.UserCredential;
import {RegData} from '../models/reg-data.model';

@Injectable()
export class AuthService {
  private authUser: AuthUser;
  private authUserSource = new Subject;
  readonly authUser$ = this.authUserSource.asObservable();

  constructor(public firebaseAuth: AngularFireAuth) {
    this.attachUserListener();
  }

  attachUserListener () {
    this.firebaseAuth.authState
      .subscribe(user => {
        if (user) {
          this.authUser = {
            id: user.uid,
            email: user.email,
            displayName: user.displayName
          };

          this.authUserSource.next(this.authUser);
        } else {
          this.authUser = null;
          this.authUserSource.next(null);
        }
      });
  }

  async doRegister (regData: RegData): Promise<void> {
    try {
      const {user} = await this.firebaseAuth.auth.createUserWithEmailAndPassword(regData.email, regData.password);

      this.doSignOut();

      return await user.updateProfile({
        displayName: regData.userName,
        photoURL: null
      });
    } catch (err) {
      return Promise.reject(err);
    }
  }

  loginByEmailAndPassword ({ email, password }): Promise<UserCredential> {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  loginByFacebook (): Promise<UserCredential> {
    return this.firebaseAuth.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    );
  }

  loginByGoogle (): Promise<UserCredential> {
    return this.firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  doSignOut (): Promise<void> {
    return this.firebaseAuth.auth.signOut();
  }
}
