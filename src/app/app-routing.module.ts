import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './modules/shared/login/login.component';
import {RegisterComponent} from './modules/shared/register/register.component';
import {NotFoundComponent} from './modules/shared/not-found/not-found.component';
import {WeatherBoxComponent} from './modules/weather/weather-box/weather-box.component';
import {SearchComponent} from './modules/weather/search/search.component';

import {AuthGuardService} from './guards/auth-guard.service';
import {HideLoginGuardService} from './guards/hide-login-guard.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'weather',
    pathMatch: 'full'
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
    path: 'search',
    component: SearchComponent,
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
