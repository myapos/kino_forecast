import {
    Component,
    EventEmitter,
    Input,
    Output,
    ViewEncapsulation
} from '@angular/core';

@Component({
    selector: 'liveDraws',
    templateUrl: './live.component.html',
    styleUrls: ['../app.component.styl'],
    encapsulation: ViewEncapsulation.Native
})

export class LiveDraws {

    // @Input() dailyMaximumOccurences;

    // events
     public chartClicked(e:any):void {
       console.log(e);
     }
    
     public chartHovered(e:any):void {
       console.log(e);
     }
     
    constructor() {
      // debugger;
    }

}