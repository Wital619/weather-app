import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AuthService} from './auth.service';
import {AuthGuardService} from './auth-guard.service';
import {HideLoginGuardService} from './hide-login-guard.service';

import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    AuthService,
    AuthGuardService,
    HideLoginGuardService
  ]
})
export class AuthModule { }
