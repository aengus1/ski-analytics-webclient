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
    return [this.activity.getValues().getAltitudeList(), this.activity.getValues().getSpeedList()];
  }

  leftAxis() {
    return ['Altitude', 0, YLabelFormat.NUMERIC];
  }

  rightAxis() {
    return ['Speed', 1, YLabelFormat.NUMERIC];
  }





}
