import {Component, Input, OnInit} from '@angular/core';
import {ChartOptions, ChartOrientation} from '../../../../chart/d3-bar/ChartOptions';

@Component({
  selector: 'app-moving-stop',
  template: `<div class="font-weight-normal">{{stopCount}} Stops</div>
    <app-d3-bar [width]="100" [height]="100" [data]="data" [yLabel]="'mins'"
                         [xLabels]="['Moving',' Stop']" [chartOptions]="this.chartOptions"></app-d3-bar>`
})
export class MovingStopComponent implements OnInit {

  private chartOptions: ChartOptions;
  constructor() { }

  @Input()
  private data: number[];

  @Input()
  private stopCount: number;

  ngOnInit() {
    this.chartOptions = new ChartOptions();
    this.chartOptions.hasNumLabel = true;
    this.chartOptions.hasNumAxis = false;
    this.chartOptions.orientation = ChartOrientation.HORIZONTAL;
    this.chartOptions.barSpacing = 0.1;
  }
}
