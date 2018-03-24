import {
    Component,
    EventEmitter,
    Input,
    Output,
    ViewEncapsulation
} from '@angular/core';

@Component({
    selector: 'doughnut',
    template: `
    <h1>Doughnut</h1>
    <div style="display: block">
      <canvas baseChart
          [data]="doughnutChartData"
          [labels]="doughnutChartLabels"
          [legend]="doughnutChartLegend"
          [chartType]="doughnutChartType"
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

export class DoughnutComponent {
    // Doughnut

    @Input() doughnutChartData;
    @Input() doughnutChartLabels;
    @Input() doughnutChartType;
    @Input() doughnutChartLegend;

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