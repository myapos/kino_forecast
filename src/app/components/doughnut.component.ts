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
    <h3>Doughnut</h3>
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
    styleUrls: ['../app.component.styl'],
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
      // 
    }
}