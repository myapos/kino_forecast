import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';

// import * as fromRoot from './reducers';

import { AppState } from './reducers';

import { initializeActions } from './actions';

import { Observable } from 'rxjs/Observable';

import { Data } from './models';

import { Effects } from './effects';

// https://angular.io/guide/displaying-data
// https://symbiotics.co.za/using-observables-in-angular-4-to-get-data-from-an-api-service/
@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  template: `
  <h2>{{title}}</h2>

  Display Draws: <br>

  <div *ngIf="apiData$ | async as d_">

    <div *ngFor="let dd of d_; let rowIndex1 = index">
      <div *ngFor="let ddd of dd; let rowIndex = index">
        <h2> ******** Draw Index {{ ((rowIndex1 + 1 ) * rowIndex) + 1 }} *****</h2>
        <h3> Draw Number: {{ ddd.drawNo }} </h3>
        <h3> DrawTime: {{ ddd.drawTime }} </h3>
        <h3> Results: {{ ddd.results }} </h3>
       </div>   
    </div>

  </div>`,
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
      // if(Object.keys(state.apiData.data).length) {
      if(state.apiData.data.draws && Object.keys(state.apiData.data).length > 1) {
        // debugger;
        const res = Object.keys(state.apiData.data).map(key => {
          // console.log( state.apiData.data[key]); 
          return state.apiData.data[key]; 
        });
        // debugger;
        // Step 1. Get all the object keys.
        let evilResponseProps = Object.keys(state.apiData.data);
        // Step 2. Create an empty array.
        let goodResponse = [];
        // Step 3. Iterate throw all keys.
        evilResponseProps.map(key => {
          if(key !== 'draws'){
            goodResponse.push(state.apiData.data[key]);
          }

        });
        // for (prop of evilResponseProps) { 
        //     goodResponse.push(evilResponseProps[prop]);
        // }
        // debugger;
        console.log('goodResponse:', goodResponse);
        // return res; 
        // return state.apiData.data; 
        return goodResponse;
      } else {
        return [];
      }


    });

   
  }

 ngOnInit() {

    this.store.dispatch(this.initializeActions.initialize());
    
    this.store.dispatch(this.initializeActions.loadData());
  }

}
