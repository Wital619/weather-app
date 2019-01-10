import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import * as firebase from 'firebase/app';
import DataSnapshot = firebase.database.DataSnapshot;
import UserCredential = firebase.auth.UserCredential;
import {User} from 'firebase';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthUser} from '../models/auth-user.interface';
import {RegData} from '../models/reg-data.model';
import {SelectedCity} from '../models/selected-city.interface';

@Injectable()
export class AuthService {
  private _authUser: AuthUser = null;

  constructor (
    public firebaseAuth: AngularFireAuth,
    public firebaseDB: AngularFireDatabase
  ) {}

  get authUser (): AuthUser {
    return this._authUser;
  }

  set authUser (user: AuthUser) {
    this._authUser = user;
  }

  getUserCity (): Observable<SelectedCity | null> {
    if (this.authUser) {
      return this.firebaseDB
        .object(`/users/${this.authUser.id}/city`)
        .valueChanges()
        .pipe(
          map((city: string) => JSON.parse(city))
        );
    } else {
      return of(null);
    }
  }

  getUserCities (): Observable<SelectedCity[]> {
    if (this.authUser) {
      return this.firebaseDB
        .object(`/users/${this.authUser.id}/cities`)
        .valueChanges()
        .pipe(
          map((cities: string) => JSON.parse(cities))
        );
    } else {
      return of([]);
    }
  }

  setUserCity (city: SelectedCity): Promise<void> {
    const cityJson = JSON.stringify(city);

    return this.firebaseDB
      .object(`/users/${this.authUser.id}/city`)
      .set(cityJson);
  }

  setRecentCity (selectedCity: SelectedCity): Promise<void> {
    if (this.authUser) {
      return this.firebaseDB
        .object(`/users/${this.authUser.id}/cities`)
        .query
        .once('value')
        .then((res: DataSnapshot) => {
          const citiesStr: string = res.val();

          return citiesStr ? JSON.parse(citiesStr) : [];
        })
        .then(
          (res: SelectedCity[]) => {
            const citiesIds: number[] = res.map(city => city.id);

            if (!citiesIds.includes(selectedCity.id)) {
              const citiesJson: string = JSON.stringify(res.concat(selectedCity));

              return this.firebaseDB
                .object(`/users/${this.authUser.id}/cities`)
                .set(citiesJson);
            }
          });
    }
  }

  getAuthState (): Observable<User> {
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
