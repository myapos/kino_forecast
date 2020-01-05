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

    @Input() todaysResult;

    public numbers:number[] = [];

    // events
     public chartClicked(e:any):void {
       console.log(e);
     }
    
     public chartHovered(e:any):void {
       console.log(e);
     }
     
    constructor() {
      // 
      for (let i=1; i<=80; i++) {
          this.numbers.push(i);
      }
    }

}