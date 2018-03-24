import {
    Component,
    EventEmitter,
    Input,
    Output,
    ViewEncapsulation
} from '@angular/core';

@Component({
    selector: 'polar',
    template: `
    <h1>Polar</h1>
    <div style="display: block">
       <canvas baseChart
        [data]="polarAreaChartData"
        [labels]="polarAreaChartLabels"
        [legend]="polarAreaLegend"
        [chartType]="polarAreaChartType"
        (chartHover)="chartHovered($event)"
        (chartClick)="chartClicked($event)">
       </canvas>
    </div>`,
    styles: [`
    button {
      color: #3498db;
    }`],
    encapsulation: ViewEncapsulation.Native
})

export class PolarComponent {
    // Doughnut

    @Input() polarAreaChartData;
    @Input() polarAreaChartLabels;
    @Input() polarAreaChartType;
    @Input() polarAreaLegend;

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