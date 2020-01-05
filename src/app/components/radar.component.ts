import {
    Component,
    EventEmitter,
    Input,
    Output,
    ViewEncapsulation
} from '@angular/core';

@Component({
    selector: 'radar',
    template: `
    <h3>Radar</h3>
    <div style="display: block">
       <canvas baseChart
        [datasets]="radarChartData"
        [labels]="radarChartLabels"
        [legend]="radarAreaLegend"
        [chartType]="radarChartType"
        (chartHover)="chartHovered($event)"
        (chartClick)="chartClicked($event)">
       </canvas>
    </div>`,
    styleUrls: ['../app.component.styl'],
    encapsulation: ViewEncapsulation.Native
})

export class RadarComponent {
    // Radar

    @Input() radarChartLabels;
    @Input() radarChartData;
    @Input() radarAreaLegend;
    @Input() radarChartType;

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