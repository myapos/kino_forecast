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
    <label>
        Start Date
        <input #start id="dt3" [owlDateTimeTrigger]="dt3" [owlDateTime]="dt3">
        <owl-date-time [pickerType]="'calendar'" #dt3></owl-date-time>
    </label>

    <label>
        End Date
        <input #end id="dt4" [owlDateTimeTrigger]="dt4" [owlDateTime]="dt4">
        <owl-date-time [pickerType]="'calendar'" #dt4></owl-date-time>
    </label>

    <button (click)="onClickMe($event)">Get it</button>
    <h3> Please select number of draws to compute most possible values for the current Date</h3>
    <br>
    <label>
        Number of draws:
        <input #lastDraws id="lastDraws">
    </label>
    <button (click)="getLastDraws($event)">Get it</button>
    `,
    styleUrls: ['../app.component.styl'],
    encapsulation: ViewEncapsulation.Native
})

export class DateSelector implements AfterViewInit{

    // @Input() dailyMaximumOccurences;

    // events
    
    @ViewChild('start') start; 
    @ViewChild('end') end; 
    @ViewChild('lastDraws') lastDraws; 
    apiData$: Observable<any>;

    onClickMe(event: any) {
      // debugger;
      const selectedStart = this.start.nativeElement.value;
      const selectedEnd = this.end.nativeElement.value;
      // console.log('clicked:');
      // console.log('log:', document.getElementById('dt3'));
      // console.log('start: ',this.start.nativeElement.value);
      // console.log('end: ',this.end.nativeElement.value);
      // debugger;
      this.store.dispatch(this.initializeActions.setStartAndEndDate(selectedStart, selectedEnd));
      // debugger;
      this.spinner.show();
      // this.store.dispatch(this.initializeActions.loadDataRange());
      // this.clickMessage = 'You are my hero!';
    }

    getLastDraws(event: any) {
      // debugger;
      // console.log('lastDraws:', document.getElementById('lastDraws'));
      console.log('lastDraws:', this.lastDraws.nativeElement.value);
      // debugger;
      this.store.dispatch(this.initializeActions.loadCustomLastDraws(this.lastDraws.nativeElement.value));  
    }

    values = '';

     constructor(
      private store: Store<any>,
      private initializeActions: initializeActions,
      private spinner: NgxSpinnerService) {
       // this.apiData$ = this.store.select(state => {
       //   debugger;
       // });
    }

    ngOnInit() {
    // debugger;

    // this.store.dispatch(this.initializeActions.initialize());
    
    // this.store.dispatch(this.initializeActions.loadData());
  }

  ngAfterViewInit() {
    // child is set
    // outputs `I am span`
    // console.log('start: ',this.start.nativeElement.value);

    this.start.nativeElement.value = `${startDate.getMonth() + 1}/${startDate.getDate()}/${startDate.getFullYear()}`;
    this.end.nativeElement.value = `${endDate.getMonth() + 1}/${endDate.getDate()}/${endDate.getFullYear()}`;
    // debugger;
  }
}