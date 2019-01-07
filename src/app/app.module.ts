import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './modules/app-routing.module';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {NgxSpinnerModule} from 'ngx-spinner';
import {SharedModule} from './modules/shared/shared.module';
import {ForecastModule} from './modules/forecast/forecast.module';
import {SearchModule} from './modules/search/search.module';

import {AppComponent} from './app.component';
import {AuthService} from './services/auth.service';
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
    NgxSpinnerModule,
    ForecastModule,
    SharedModule,
    SearchModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
