import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import UserCredential = firebase.auth.UserCredential;

import {AuthUser} from '../models/auth-user.interface';
import {RegData} from '../models/reg-data.model';
import {Subject} from 'rxjs';

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

  doRegister (regData: RegData): Promise<void> {
    return this.firebaseAuth.auth
      .createUserWithEmailAndPassword(regData.email, regData.password)
      .then(({ user }) => {
        return user.updateProfile({
          displayName: regData.userName,
          photoURL: null
        });
      })
      .then(() => this.doSignOut())
      .catch(err => Promise.reject(err));
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
