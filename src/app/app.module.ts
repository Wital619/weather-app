import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {SharedModule} from './modules/shared/shared.module';
import {WeatherModule} from './modules/weather/weather.module';
import {NgxSpinnerModule} from 'ngx-spinner';

import {AppComponent} from './app.component';
import {AuthService} from './auth.service';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    WeatherModule,
    SharedModule,
    NgxSpinnerModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
