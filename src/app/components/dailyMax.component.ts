import {
    Component,
    EventEmitter,
    Input,
    Output,
    ViewEncapsulation
} from '@angular/core';

@Component({
    selector: 'dailymax',
    template: `
    <h3> Last 12 most possible values: </h3>
    <table id="table">
        <tr> <th> Number </th> <th> Occurences </th></tr>
        <tr *ngFor="let value of dailyMaximumOccurences; let rowIndex1 = index">
           <td *ngFor="let v of value;">
               {{ v }} 
           </td>
        </tr> 
    </table>`,
    styleUrls: ['../app.component.styl'],
    encapsulation: ViewEncapsulation.Native
})

export class DailyMax {

    @Input() dailyMaximumOccurences;

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