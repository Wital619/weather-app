import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './modules/app-routing.module';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ToastrModule} from 'ngx-toastr';
import {PublicModule} from './modules/public/public.module';
import {ForecastModule} from './modules/forecast/forecast.module';
import {SearchModule} from './modules/search/search.module';

import {AppComponent} from './app.component';

import {AuthService} from './services/auth.service';
import {ShowToastrService} from './services/show-toastr.service';

import {environment} from '../environments/environment.prod';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    ForecastModule,
    PublicModule,
    SearchModule
  ],
  providers: [
    AuthService,
    ShowToastrService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
