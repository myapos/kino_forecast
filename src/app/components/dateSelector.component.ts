import {
    Component,
    EventEmitter,
    Input,
    Output,
    ViewEncapsulation,
    ViewChild,
    AfterViewInit,
    ElementRef
} from '@angular/core';

import { Store } from '@ngrx/store';

import { AppState } from '../reducers';

import { initializeActions } from '../actions';

import { startDateStr, endDateStr, startDate, endDate } from '../constants';

import { NgxSpinnerService } from 'ngx-spinner';

import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'dateSelector',
    template: `
    <h3> Please select time frame</h3>
    <br>
    <div class="container">
      <form>
        <div class="row">
          <div class="col-25">
            <label for="dt3">
                Start Date
            </label>
          </div>

          <div class="col-75">
            <input #start id="dt3" [owlDateTimeTrigger]="dt3" [owlDateTime]="dt3">
            <owl-date-time [pickerType]="'calendar'" #dt3></owl-date-time>
          </div>
        </div> <!-- end of row !-->
        <div class="row">
          <div class="col-25">
            <label for="dt4">
                End Date
            </label>
          </div>

          <div class="col-75">
            <input #end id="dt4" [owlDateTimeTrigger]="dt4" [owlDateTime]="dt4">
            <owl-date-time [pickerType]="'calendar'" #dt4></owl-date-time>
          </div>
        </div> <!-- end of row !-->
      </form>
      <button class='button' (click)="onClickMe($event)">Get it</button>
    </div>
    
    
    <h3> Please select number of draws to compute occurences for each number for the selected time frame</h3>
      <div class="container">
        <form>
          <div class="row">
            <div class="col-25">
              <label for="lastDraws">
                Number of draws:
              </label>
            </div>

            <div class="col-75">
              <input #lastDraws id="lastDraws">
            </div>
          </div> <!-- end of row !-->
        </form>
      <button class='button' (click)="getLastDraws($event)">Get it</button>
    </div>
    `,
    styleUrls: ['../app.component.styl'],
    encapsulation: ViewEncapsulation.None
})

export class DateSelector implements AfterViewInit{

    // @Input() dailyMaximumOccurences;

    // events
    
    @ViewChild('start') start; 
    @ViewChild('end') end; 
    @ViewChild('lastDraws') lastDraws; 
    apiData$: Observable<any>;

    onClickMe(event: any) {
      // 
      const selectedStart = this.start.nativeElement.value;
      const selectedEnd = this.end.nativeElement.value;
      // console.log('clicked:');
      // console.log('log:', document.getElementById('dt3'));
      // console.log('start: ',this.start.nativeElement.value);
      // console.log('end: ',this.end.nativeElement.value);
      // 
      this.store.dispatch(this.initializeActions.setStartAndEndDate(selectedStart, selectedEnd));
      // 
      this.spinner.show();
      // this.store.dispatch(this.initializeActions.loadDataRange());
      // this.clickMessage = 'You are my hero!';
    }

    getLastDraws(event: any) {
      // 
      // console.log('lastDraws:', document.getElementById('lastDraws'));
      console.log('lastDraws:', this.lastDraws.nativeElement.value);
      // 
      this.store.dispatch(this.initializeActions.loadCustomLastDraws(this.lastDraws.nativeElement.value));  
      // this.spinner.show();
    }

    values = '';

     constructor(
      private store: Store<any>,
      private initializeActions: initializeActions,
      private spinner: NgxSpinnerService) {
       // this.apiData$ = this.store.select(state => {
       //   
       // });
    }

    ngOnInit() {
    // 

    // this.store.dispatch(this.initializeActions.initialize());
    
    // this.store.dispatch(this.initializeActions.loadData());
  }

  ngAfterViewInit() {
    // child is set
    // outputs `I am span`
    // console.log('start: ',this.start.nativeElement.value);

    this.start.nativeElement.value = `${startDate.getMonth() + 1}/${startDate.getDate()}/${startDate.getFullYear()}`;
    this.end.nativeElement.value = `${endDate.getMonth() + 1}/${endDate.getDate()}/${endDate.getFullYear()}`;
    // 
  }
}