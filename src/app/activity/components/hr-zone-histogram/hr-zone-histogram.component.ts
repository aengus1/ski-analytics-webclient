import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ChartOptions, ChartOrientation, YLabelFormat} from '../../../chart/d3-bar/ChartOptions';
import {Activity} from '../../model/activity/Activity_pb';


@Component({
  selector: 'app-hr-zone-histogram',
  template: `<app-d3-bar [width]="100" [height]="100" [yLabel]="'mins'"
                         [xLabels]="['1',' 2','3','4','5']" [chartOptions]="this.chartOptions" [data]="this._data"></app-d3-bar>`,
  styleUrls: ['./hr-zone-histogram.component.css']
})
export class HrZoneHistogramComponent implements OnInit, OnChanges {

  private chartOptions: ChartOptions;

  @Input()
  public distTime = 1;

  @Input()
  public thresholds: number[];

  @Input()
  public activity: Activity;

  private _data: number[];

  constructor() { }

 data(): number[] {
    return this._data;
}

ngOnChanges() {
  this.calcData();
}

  ngOnInit() {
    this.chartOptions = new ChartOptions();
    this.chartOptions.hasNumLabel = true;
    this.chartOptions.hasNumAxis = false;
    this.chartOptions.orientation = ChartOrientation.VERTICAL;
    this.chartOptions.barSpacing = 0;
    this.chartOptions.yLabelFormat = YLabelFormat.INTERVAL;
    this._data = this.calcData();

  }

 public calcData(): number[] {

 console.log('hr zone histogram calculating bins');
// fudge hr
    // this.activity.getValues().setHrList([110, 120, 121, 125, 127, 140, 140, 150, 160, 171, 180, 135, 110, 149, 150]);
    let foundZone = false;
    let zone = 1;
    const data: number[] = [0, 0, 0, 0, 0];
    const hrs = this.activity.getValues().getHrList();
    const ts: Date[] = this.activity.getValues().getTsList().map(x => new Date(x));

    // time in zone
    if (this.distTime === 1) {
      for (let i = 1; i < hrs.length; i++) {
        // console.log('hr[i]' + hrs[i]);
        foundZone = false;
        zone = 1;
        if (hrs[i] < this.thresholds[0]) {
          data[0] += (ts[i].valueOf() - ts[i - 1].valueOf()) / 1000;
          // console.log('z1: ' + data[0]);
          foundZone = true;
        } else {
          while (foundZone === false && zone++ <= 4) {
            if (hrs[i] >= this.thresholds[zone - 2] && hrs[i] < this.thresholds[zone - 1]) {
              data[zone - 1] += (ts[i].valueOf() - ts[i - 1].valueOf()) / 1000;
              // console.log('z' + zone + ':' + data[zone - 1]);
              foundZone = true;
            // } else {
            //   console.log(hrs[i] + ' not in: ' + zone);
            // }
          }
          if (foundZone === false && hrs[i] >= this.thresholds[3]) {
            data[4] += (ts[i].valueOf() - ts[i - 1].valueOf()) / 1000;
            // console.log('z5:' + data[4]);
            foundZone = true;
          }
        }
        // console.log(' found zone ' + hrs[i] + ' ' + foundZone);

      }
    }
    // console.log('data = ' + data);
    return data;
  }
}
