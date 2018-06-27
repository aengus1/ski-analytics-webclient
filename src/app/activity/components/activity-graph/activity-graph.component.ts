import {Component, Input, OnInit} from '@angular/core';
import {Activity} from '../../model/activity/Activity_pb';
import {ChartOptions, YLabelFormat} from '../../../chart/components/d3-bar/ChartOptions';

@Component({
  selector: 'app-activity-graph-container',
  templateUrl: './activity-graph.component.html',
  styleUrls: ['./activity-graph.component.css']
})
export class ActivityGraphComponent implements OnInit {


  @Input()
  private activity: Activity;

  private chartOptions: ChartOptions;

  constructor() {
  }

  ngOnInit() {
    this.chartOptions = new ChartOptions();
  }

  chartData() {
    return [this.activity.getValues().getAltitudeList(), this.activity.getValues().getSpeedList(),
    this.activity.getValues().getHrList(), this.activity.getValues().getMovingList()];
  }

  getSeriesKey() {
    return [
      ['Altitude', 0, YLabelFormat.NUMERIC, 'deepskyblue'],
      ['Speed', 1, YLabelFormat.NUMERIC, 'red'],
      ['HR', 2, YLabelFormat.NUMERIC, '#dddd00'],
      ['Moving', 3, YLabelFormat.NUMERIC, 'yellowgreen']
      ];
  }





}
