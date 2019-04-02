import {Component, Input, OnInit} from '@angular/core';
import {ChartOptions, ChartOrientation} from '../../../../chart/components/d3-bar/ChartOptions';

@Component({
  selector: 'app-moving-stop',
  template: `<div class="font-weight-normal">{{stopCount}} Stops</div>
    <!--&lt;!&ndash; <app-d3-bar [width]="100" [height]="100" [data]="data" [yLabel]="'mins'"-->
                         <!--[xLabels]="['Moving',' Stop']" [chartOptions]="this.chartOptions"></app-d3-bar> &ndash;&gt;-->
  <app-d3-bar-native  [data]="data" [yLabel]="'mins'" [margin]="10" [height]="100" [width]="100"
    [xLabels]="['Moving',' Stop']" [chartOptions]="this.chartOptions"></app-d3-bar-native>`
})
export class MovingStopComponent implements OnInit {

  public chartOptions: ChartOptions;
  constructor() { }

  @Input()
  public data: number[];

  @Input()
  public stopCount: number;

  ngOnInit() {
    this.chartOptions = new ChartOptions();
    this.chartOptions.hasNumLabel = true;
    this.chartOptions.hasNumAxis = false;
    this.chartOptions.orientation = ChartOrientation.HORIZONTAL;
    this.chartOptions.barSpacing = 0.4;
  }
}
