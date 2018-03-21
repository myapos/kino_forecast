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

import { numOfNumbers } from './constants';

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
     <!--<div style="display: block">
       <canvas baseChart
               [datasets]="barChartData"
               [labels]="barChartLabels"
               [options]="barChartOptions"
               [legend]="barChartLegend"
               [chartType]="barChartType"
               (chartHover)="chartHovered($event)"
               (chartClick)="chartClicked($event)"></canvas>
     </div> -->
   </div>

   <div style="display: block">
     <canvas baseChart
                 [data]="doughnutChartData"
                 [labels]="doughnutChartLabels"
                 [legend]="doughnutChartLegend"
                 [chartType]="doughnutChartType"
                 (chartHover)="chartHovered($event)"
                 (chartClick)="chartClicked($event)"></canvas>
   </div>

   <div style="display: block">
     <canvas baseChart
             [data]="polarAreaChartData"
             [labels]="polarAreaChartLabels"
             [legend]="polarAreaLegend"
             [chartType]="polarAreaChartType"
             (chartHover)="chartHovered($event)"
             (chartClick)="chartClicked($event)"></canvas>
   </div>
   <div style="display: block">
     <canvas baseChart
             [datasets]="radarChartData"
             [labels]="radarChartLabels"
             [legend]="radarAreaLegend"
             [chartType]="radarChartType"
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

  public barChartLabels:string[] = [];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = false;
  public barChartData:any[] = [
    {data: [], label: ''}
  ];

  // Doughnut
  public doughnutChartLabels:string[] = [];
  public doughnutChartData:number[] = [];
  public doughnutChartType:string = 'doughnut';
  public doughnutChartLegend:boolean = false;
 
  // PolarArea
  public polarAreaChartLabels:string[] = [];
  public polarAreaChartData:number[] = [];
  public polarAreaLegend:boolean = false;
  public polarAreaChartType:string = 'polarArea';

  // Radar
  public radarChartLabels:string[] = [];
  public radarChartData:any = [];
  public radarAreaLegend:boolean = false;
  public radarChartType:string = 'radar';

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

  // private store: Store<AppState>,
  constructor(
    private store: Store<any>,
    private initializeActions: initializeActions,
    private Effects : Effects
   ) {

    this.apiData$ = this.store.select(state => {
      if(state.apiData.data.draws && Object.keys(state.apiData.data).length > 1) {
        const res = Object.keys(state.apiData.data).map(key => {
          // console.log( state.apiData.data[key]); 
          return state.apiData.data[key]; 
        });
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
        const processedData = processData(goodResponse);

        const sortedData = processedData.sortableCounts;
        
        this.occurences$ = processedData.counts;
        this.doughnutChartLabels = [];
        this.polarAreaChartLabels = [];
        this.radarChartLabels = [];

        // this.barChartLabels = [];
        for (let segm in this.occurences$) {
          let data = [];
          if(this.occurences$.hasOwnProperty(segm)) {

            for (let i=0; i < numOfNumbers; i++) {
              if(i === parseInt(segm)-1) {
                data.push(this.occurences$[segm]);
              } else data.push(0);
            }

            this.doughnutChartLabels.push(segm.toString());
            this.polarAreaChartLabels.push(segm.toString());
            this.radarChartLabels.push(segm.toString());
            // this.barChartLabels.push(segm.toString());

            // this.barChartData.push({
            //   data,
            //   label: segm
            // })

            this.radarChartData.push({
              data,
              label: segm
            })
            this.doughnutChartData.push(this.occurences$[segm]);
            this.polarAreaChartData.push(this.occurences$[segm]);
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
