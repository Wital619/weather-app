import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import * as firebase from 'firebase/app';
import UserCredential = firebase.auth.UserCredential;

import {Observable, of} from 'rxjs';
import {AuthUser} from './models/auth-user.interface';
import {RegData} from './models/reg-data.model';
import {User} from 'firebase';

@Injectable()
export class AuthService {
  _authUser: AuthUser = null;

  constructor (
    public firebaseAuth: AngularFireAuth,
    public firebaseDB: AngularFireDatabase,
  ) {}

  get authUser (): AuthUser {
    return this._authUser;
  }

  set authUser (user: AuthUser) {
    this._authUser = user;
  }

  getUserCity () {
    if (this.authUser) {
      return this.firebaseDB
        .object(`/users/${this.authUser.id}`)
        .valueChanges();
    } else {
      return null;
    }
  }

  setUserCity (cityId: number): Promise<void> {
    return this.firebaseDB
      .object(`/users/${this.authUser.id}`)
      .set(cityId);
  }

  getAuthState (): Observable<User | null> {
    return this.firebaseAuth.authState;
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
      .then(() => {
        this.doSignOut();
      })
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
