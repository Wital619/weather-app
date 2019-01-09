import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './public/login/login.component';
import {RegisterComponent} from './public/register/register.component';
import {NotFoundComponent} from './public/not-found/not-found.component';
import {ForecastContainerComponent} from './forecast/forecast-container/forecast-container.component';
import {SearchContainerComponent} from './search/search-container/search-container.component';
import {HomeComponent} from './forecast/home/home.component';

import {AuthGuardService} from '../guards/auth-guard.service';
import {HideLoginGuardService} from '../guards/hide-login-guard.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
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
    path: 'forecast',
    component: ForecastContainerComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'search',
    component: SearchContainerComponent,
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
