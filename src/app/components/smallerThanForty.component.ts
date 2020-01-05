import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from "@angular/core";

@Component({
  selector: "smallerThanForty",
  template: `
    <div class="title24">Smaller than forty for 24 values</div>
    <table id="table">
      <tr>
        <th>Number</th>
        <th>Occurences</th>
      </tr>
      <tr
        *ngFor="let value of smallerThan40; let rowIndex1 = index"
        [ngClass]="(rowIndex1 + 1) % 12 === 0 ? 'twelve' : ''"
      >
        <td *ngFor="let v of value">
          {{ v }}
        </td>
      </tr>
    </table>
  `,
  styleUrls: ["../app.component.styl"],
  encapsulation: ViewEncapsulation.None
})
export class SmallerThanForty {
  @Input() smallerThan40;

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  constructor() {}
}
