import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {NotFoundComponent} from './shared/not-found/not-found.component';
import {WeatherBoxComponent} from './weather/weather-box/weather-box.component';

import {AuthGuardService} from './auth/auth-guard.service';
import {HideLoginGuardService} from './auth/hide-login-guard.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'weather',
    pathMatch: 'full',
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [HideLoginGuardService]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [HideLoginGuardService]
  },
  {
    path: 'weather',
    component: WeatherBoxComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
