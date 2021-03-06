import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { StoreModule } from '@ngrx/store';

import {initializeActions} from './actions';

import { reducer } from './reducers';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { HttpModule } from '@angular/http';

import { EffectsModule } from '@ngrx/effects';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Service } from './services';

import { Effects } from './effects';

import { ChartsModule } from 'ng2-charts';

import { TabModule } from 'angular-tabs-component';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { DoughnutComponent } from './components/doughnut.component';

import { PolarComponent } from './components/polar.component';

import { RadarComponent } from './components/radar.component';

import { DailyMax } from './components/dailyMax.component';

import { SmallerThanForty } from './components/smallerThanForty.component';

import { DateSelector } from './components/dateSelector.component';

import { LiveDraws } from './components/live.component';

import { About } from './components/about.component';

import { Contact } from './components/contact.component';


// Import library module
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    DoughnutComponent,
    PolarComponent,
    RadarComponent,
    DailyMax,
    SmallerThanForty,
    DateSelector,
    LiveDraws,
    About,
    Contact
  ],
  imports: [
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ChartsModule,
    TabModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    NgxSpinnerModule,
    // StoreModule.forRoot(reducer),
    StoreModule.forRoot({ apiData: reducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 5,
      monitor: reducer
    }),
    EffectsModule.forRoot([Effects]),
  ],
  providers: [initializeActions, Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
