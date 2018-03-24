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

import { Service } from './services';

import { Effects } from './effects';

import { ChartsModule } from 'ng2-charts';

import { TabModule } from 'angular-tabs-component';

import { DoughnutComponent } from './components/doughnut.component';

import { PolarComponent } from './components/polar.component';


import { RadarComponent } from './components/radar.component';


@NgModule({
  declarations: [
    AppComponent,
    DoughnutComponent,
    PolarComponent,
    RadarComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    // TabModule,
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
