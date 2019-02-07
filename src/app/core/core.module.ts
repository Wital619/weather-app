import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthService } from './services/auth.service';
import { ShowToastrService } from './services/show-toastr.service';
import { UtilityService } from './services/utility.service';
import { WeatherService } from './services/weather.service';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavComponent } from './components/nav/nav.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { AuthGuard } from './guards/auth.guard';
import { HideLoginGuard } from './guards/hide-login.guard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavComponent,
    NotFoundComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NavComponent,
    NotFoundComponent
  ],
  providers: [
    AuthService,
    ShowToastrService,
    UtilityService,
    WeatherService,
    AuthGuard,
    HideLoginGuard
  ]
})
export class CoreModule {}
