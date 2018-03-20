import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';

// import * as fromRoot from './reducers';

import { AppState } from './reducers';

import { initializeActions } from './actions';

import { Observable } from 'rxjs/Observable';

import { Data } from './models';

import { Effects } from './effects';

import processData from './utils/processData';

// https://alligator.io/angular/chartjs-ng2-charts/
// https://angular.io/guide/displaying-data
// https://symbiotics.co.za/using-observables-in-angular-4-to-get-data-from-an-api-service/
@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  template: `
  <h2>{{title}}</h2>

  Display Draws: <br>
  <div *ngIf="apiData$ | async as d_">
  <!--

    <div *ngFor="let dd of d_; let rowIndex1 = index">
      <div *ngFor="let ddd of dd; let rowIndex = index">
        <h2> ******** Draw Index {{ ((rowIndex1 + 1 ) * rowIndex) + 1 }} *****</h2>
        <h3> Draw Number: {{ ddd.drawNo }} </h3>
        <h3> DrawTime: {{ ddd.drawTime }} </h3>
        <h3> Results: {{ ddd.results }} </h3>
       </div>   
    </div>

-->

  Occurences: <br>
    <div>
      {{occurences$ | json}}
    </div>

   <div>
     <div style="display: block">
       <canvas baseChart
               [datasets]="barChartData"
               [labels]="barChartLabels"
               [options]="barChartOptions"
               [legend]="barChartLegend"
               [chartType]="barChartType"
               (chartHover)="chartHovered($event)"
               (chartClick)="chartClicked($event)"></canvas>
     </div>
     <button (click)="randomize()">Update</button>
   </div>

   <div style="display: block">
     <canvas baseChart
                 [data]="doughnutChartData"
                 [labels]="doughnutChartLabels"
                 [chartType]="doughnutChartType"
                 (chartHover)="chartHovered($event)"
                 (chartClick)="chartClicked($event)"></canvas>
   </div>

  </div>
  `,
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit{
  title = 'Forecasting Kino Results';
  // loadDataSuccess$ : Observable<any>;
  // apiData$: Observable<Data>;
  apiData$: Observable<any>;
  occurences$;

  public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  // public barChartLabels:string[] = [];
  public barChartType:string = 'bar';
  // public barChartType:string;
  // public barChartLegend:boolean = true;
  public barChartLegend:boolean = false;
 
  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];
  // public barChartData:any[] = [];

  // Doughnut
  public doughnutChartLabels:string[] = ['1', '2', '3', '4'];
  public doughnutChartData:number[] = [];
  public doughnutChartType:string = 'doughnut';
 
  onChartClick(event) {
    console.log(event);
  }

// events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
  public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }

  // private store: Store<AppState>,
  constructor(
    private store: Store<any>,
    private initializeActions: initializeActions,
    private Effects : Effects
   ) {
    // debugger;
    // processData('test');
    this.apiData$ = this.store.select(state => {
      // debugger;
      // this.barChartData = [];
      // this.barChartLabels = [];
      this.doughnutChartData = []; //empty arrays
      this.doughnutChartLabels = [];

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

        // console.log('goodResponse:', goodResponse);
        const processedData = processData(goodResponse);
        this.occurences$ = processedData.counts;

        // console.log('keys:', Object.keys(this.occurences$));

        this.barChartLabels = Object.keys(this.occurences$);
        // this.doughnutChartLabels = Object.keys(this.occurences$);
        // debugger;
        // this.barChartData.push({
        //   data: this.occurences$,
        //   label: 'test'
        // });
        for (let segm in this.occurences$) {
          let data = [];
          if(this.occurences$.hasOwnProperty(segm)) {
            // debugger;

            for (let i=0; i < 80; i++) {
              if(i === parseInt(segm)-1) {
                data.push(this.occurences$[segm]);
              } else data.push(0);
            }
            // debugger;
            // this.doughnutChartLabels.push(parseInt(segm)-1);
            // console.log('data:', data);
            this.barChartData.push({
              data,
              label: segm
            })
            this.doughnutChartData.push(this.occurences$[segm]);
          }
        }
        // debugger;
        // this.store.dispatch(this.initializeActions.callUnplugApi(processedData.unplugData));

        // trigger action to unplug api

        // load graph for histogram

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
