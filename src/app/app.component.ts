import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Store } from '@ngrx/store';

import { AppState } from './reducers';

import { initializeActions } from './actions';

import { Observable } from 'rxjs/Observable';

import { Data } from './models';

import { Effects } from './effects';

import processData from './utils/processData';

import { numOfNumbers, interval } from './constants';

import { DoughnutComponent } from './components/doughnut.component';

// https://napster2210.github.io/ngx-spinner/
import { NgxSpinnerService } from 'ngx-spinner';

// https://alligator.io/angular/chartjs-ng2-charts/
// https://angular.io/guide/displaying-data
// https://symbiotics.co.za/using-observables-in-angular-4-to-get-data-from-an-api-service/
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit{
  title = 'Keno processing app';
  // loadDataSuccess$ : Observable<any>;
  // apiData$: Observable<Data>;
  apiData$: Observable<any>;
  occurences$;
  dailyMaximumOccurences$;
  timeInt$;
  todaysResult$;
  // public barChartLabels:string[] = [];
  // public barChartType:string = 'bar';
  // public barChartLegend:boolean = false;
  // public barChartData:any[] = [
  //   {data: [], label: ''}
  // ];

  // Doughnut
  public doughnutChartLabels:string[] = [];
  public doughnutChartData:number[] = [];
  public doughnutChartDataTest:number[] = [];
  public doughnutChartType:string = 'doughnut';
  public doughnutChartLegend:boolean = false;
 
  // PolarArea
  public polarAreaChartLabels:string[] = [];
  public polarAreaChartData:number[] = [];
  public polarAreaLegend:boolean = false;
  public polarAreaChartType:string = 'polarArea';

  // Radar
  public radarChartLabels:string[] = [];
  public radarChartData:any = [{data: '' ,label: '' }];
  public radarAreaLegend:boolean = false;
  public radarChartType:string = 'radar';

  public childTitle:string = 'This text is passed to child';

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
    private Effects : Effects,
    private spinner: NgxSpinnerService
   ) {
    // this.spinner$ = spinner;

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

          if(key !== 'draws' && key !== 'start'&& key !== 'end'){
            goodResponse.push(state.apiData.data[key]);
          }
        });

        // console.log('goodResponse:', goodResponse);
        // console.log('good response last:', goodResponse[goodResponse.length - 1]);
        // debugger;
        if(goodResponse[goodResponse.length - 1]) {

          const tempRes = [goodResponse[goodResponse.length - 1]];
          // let drawTime = '';
          var res__ = {
              drawNo: -1,
              drawTime: '',
              results: []
            };
            
          // process time
          if(tempRes[0].drawTime) {
            console.log('draw time:', tempRes[0].drawTime.split('T'));
            let drawTime = tempRes[0].drawTime.split('T')[0] + ' ' + tempRes[0].drawTime.split('T')[1];
            res__ = {  
              results: tempRes[0].results,
              drawTime: drawTime,
              drawNo: tempRes[0].drawNo
            };
            // const drawTime = res[0].drawTime.split('T');
            console.log('res__:', res__);
            this.todaysResult$ = [res__];
          } else {
            this.todaysResult$ = tempRes;
          }


          // debugger;


          if(this.todaysResult$[0].results) {
            // console.log('td results:', this.todaysResult$[0].results.indexOf(1));
          } 
        }else {

          this.todaysResult$ = [];
          const temp = {
            drawNo: -1,
            drawTime: -1,
            results: []
          };
          this.todaysResult$.push(temp);
          // this.todaysResult$[0].results = ['no results yet'];
        }

        const processedData = processData(goodResponse);

        const sortedData = processedData.sortableCountsAr;

        this.dailyMaximumOccurences$ = sortedData.slice(0, 12);

        this.occurences$ = processedData.counts;

        // re initialize --- empty arrays
        this.doughnutChartLabels = [];
        this.polarAreaChartLabels = [];
        this.radarChartLabels = [];

        // re initialize arrays --- empty arrays
        this.doughnutChartData.length = 0;
        this.polarAreaChartData.length = 0;
        this.radarChartData.length = 0;

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

            this.radarChartData.push({
              data,
              label: segm
            });
            this.doughnutChartData.push(this.occurences$[segm]);
            this.polarAreaChartData.push(this.occurences$[segm]);
          }
        }


        // hide spinner

        this.spinner.hide();

        return goodResponse;
      } else {

        this.todaysResult$ = [];
        const temp = {
          drawNo: -1,
          drawTime: -1,
          results: []
        };
        this.todaysResult$.push(temp);
        return {};
      }
    });

   
  }

 ngOnInit() {

    this.store.dispatch(this.initializeActions.initialize());
    
    this.store.dispatch(this.initializeActions.loadData());

    this.spinner.show();

  }

  manageTabs(event) {

    if (event.tabTitle === 'Keno Live') {
      this.store.dispatch(this.initializeActions.getDrawsOfCurrentDate());

      this.timeInt$ = setInterval(() => { 
        console.log('getting draw results...');

        this.store.dispatch(this.initializeActions.getDrawsOfCurrentDate());
        this.spinner.show();
      }, interval);

      this.spinner.show();
    } else if(event.tabTitle === 'Home' || event.tabTitle === 'Forecasting') {
      
      clearInterval(this.timeInt$);
      console.log('stopping getting draw results...'); 

      this.store.dispatch(this.initializeActions.initialize());
      this.store.dispatch(this.initializeActions.loadData());
      this.spinner.show();
    }

  }
}
