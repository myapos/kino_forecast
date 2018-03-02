import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';

// import * as fromRoot from './reducers';

import { AppState } from './reducers';

import { initializeActions } from './actions';

import { Observable } from 'rxjs/Observable';

import { Data } from './models';

import { Effects } from './effects';

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  template: `
  <h2>Hello world from {{title}}</h2>
  Chunks: <br>
  
    <div *ngIf="apiData$ | async as d">
      test
      <h2> {{ d.login}} </h2>
      <h2> {{ d.id}} </h2>
      <h2> {{ d.avatar_url}} </h2>
    </div>
  `,
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit{
  title = 'Redux-Angular-App';
  // loadDataSuccess$ : Observable<any>;
  // apiData$: Observable<Data>;
  apiData$: Observable<any>;

    // private store: Store<AppState>,
  constructor(
    private store: Store<any>,
    private initializeActions: initializeActions,
    private Effects : Effects
   ) {
    // debugger;
    this.apiData$ = this.store.select(state => {
      // debugger;
      return state.apiData.data;

    });
    // debugger;
    // console.log('data:', this.apiData$);
   
  }

 ngOnInit() {

    this.store.dispatch(this.initializeActions.initialize());
    
    this.store.dispatch(this.initializeActions.loadData());
  }

}
