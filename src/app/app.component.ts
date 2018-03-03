import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';

// import * as fromRoot from './reducers';

import { AppState } from './reducers';

import { initializeActions } from './actions';

import { Observable } from 'rxjs/Observable';

import { Data } from './models';

import { Effects } from './effects';

//https://angular.io/guide/displaying-data
@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  template: `
  <h2>Hello world from {{title}}</h2>
  Display Draws: <br>

  <div *ngIf="apiData$ | async as dd">
      <div *ngFor="let d of dd">
            <h2>Draw</h2>
            <h3> Draw Number: {{ d.drawNo}} </h3>
            <h3> Time: {{ d.drawTime}} </h3>
            <h3> Results: {{ d.results}} </h3>
      </div>
      <div>Results {{dd[0].drawNo}}</div>
  </div>
  `,
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit{
  title = 'Forecasting Kino Results';
  // loadDataSuccess$ : Observable<any>;
  // apiData$: Observable<Data>;
  apiData$: Observable<any>;

  // private store: Store<AppState>,
  constructor(
    private store: Store<any>,
    private initializeActions: initializeActions,
    private Effects : Effects
   ) {

    this.apiData$ = this.store.select(state => {
      // debugger;
      // return state.apiData.data.draws.draw ?  state.apiData.data.draws.draw[0] : '';
      if(state.apiData.data.draws.draw) {
        return state.apiData.data.draws.draw;
      } else {
        return [{
              drawNo: 'Loading History Results',
              drawTime: 'Loading History Results',
              results: 'Loading History Results',
            }

        ];
      }


    });

   
  }

 ngOnInit() {

    this.store.dispatch(this.initializeActions.initialize());
    
    this.store.dispatch(this.initializeActions.loadData());
  }

}
