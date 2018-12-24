import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth';
import { AngularFireDatabase} from '@angular/fire/database';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  userId: string;

  constructor(public authService: AngularFireAuth,
              public dbService: AngularFireDatabase) {
    this.authService.authState.subscribe(
      user => {
        if (user) {
          console.log(user);
          this.userId = user.uid;
        }
      });
  }

  doRegister ({userName, email, password}) {
    return firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.dbService
          .list('/users')
          .push({ userName, email });
      });
  }

  doLogin (email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  doSignOut () {
    return firebase.auth().signOut();
  }

  doFacebookLogin () {
    const provider = new firebase.auth.FacebookAuthProvider();

    return this.authService.auth.signInWithPopup(provider);
  }

  doGoogleLogin () {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');

    return this.authService.auth.signInWithPopup(provider);
  }
}
