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
    <table id="table">
        <tr> <th> Number </th> <th> Occurences </th></tr>
        <tr *ngFor="let value of dailyMaximumOccurences; let rowIndex1 = index" [ngClass]="(rowIndex1 + 1) % 12 === 0 ? 'twelve' : '' ">
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
      // 
    }
}