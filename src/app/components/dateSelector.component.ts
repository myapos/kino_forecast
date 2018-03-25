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

@Component({
    selector: 'dateSelector',
    template: `
    <div> Please select time frame and press process button:</div>
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

    <button (click)="onClickMe($event)">Process</button>`,
    styleUrls: ['../app.component.styl'],
    encapsulation: ViewEncapsulation.Native
})

export class DateSelector implements AfterViewInit{

    // @Input() dailyMaximumOccurences;

    // events
    
    @ViewChild('start') start; 
    @ViewChild('end') end; 

    onClickMe(event: any) {
      // debugger;
      const selectedStart = this.start.nativeElement.value;
      const selectedEnd = this.end.nativeElement.value;
      console.log('clicked:');
      // console.log('log:', document.getElementById('dt3'));
      // console.log('start: ',this.start.nativeElement.value);
      // console.log('end: ',this.end.nativeElement.value);
      this.store.dispatch(this.initializeActions.setStartAndEndDate(selectedStart, selectedEnd));
      // debugger;
      // this.store.dispatch(this.initializeActions.loadDataRange());
      // this.clickMessage = 'You are my hero!';
    }

    values = '';

     constructor(
      private store: Store<any>,
      private initializeActions: initializeActions) {
      // debugger;

    }

    ngOnInit() {
    // debugger;



    // this.store.dispatch(this.initializeActions.initialize());
    
    // this.store.dispatch(this.initializeActions.loadData());
  }

  ngAfterViewInit() {
    // child is set
    // outputs `I am span`
    console.log('start: ',this.start.nativeElement.value);

    this.start.nativeElement.value = `${startDate.getDate()}-${startDate.getMonth() + 1}-${startDate.getFullYear()}`;
    this.end.nativeElement.value = `${endDate.getDate()}-${endDate.getMonth() + 1}-${endDate.getFullYear()}`;
    // debugger;
  }
}