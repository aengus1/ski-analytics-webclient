import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Activity} from '../../model/activity/Activity_pb';
import {ChartOptions, YLabelFormat} from '../../../chart/components/d3-bar/ChartOptions';
import {D3LineComponent} from '../../../chart/components/d3-line/d3-line.component';
import {DataSeries} from '../../../chart/components/d3-line/data-series.model';

@Component({
  selector: 'app-activity-graph-container',
  templateUrl: './activity-graph.component.html',
  styleUrls: ['./activity-graph.component.css']
})
export class ActivityGraphComponent implements OnInit {


  @Input()
  private activity: Activity;

  private chartOptions: ChartOptions;

  @ViewChild(D3LineComponent) graph;

  private xAxisFormat = new Map<string, number>();

  // private showSeries: number[] = [0, 1, 2];

  constructor() {
  }
  private seriesKey =    [
    new DataSeries('Altitude (m)', 0, 'deepskyblue', YLabelFormat.NUMERIC,  true),
    new DataSeries('Speed (km/h)', 1, '#ffa9e6', YLabelFormat.NUMERIC, true),
    new DataSeries('Heart Rate (bpm)', 2, '#99fac8', YLabelFormat.NUMERIC,  true),
    new DataSeries('Moving', 3, 'yellowgreen', YLabelFormat.NUMERIC, false)
  ];


  ngOnInit() {
    this.chartOptions = new ChartOptions();
    this.xAxisFormat.set('time of day', 0);
    this.xAxisFormat.set('seconds', 1);
    this.xAxisFormat.set('hh:mm:ss', 2);
  }

  chartData() {
    return [this.activity.getValues().getAltitudeList(), this.activity.getValues().getSpeedList(),
    this.activity.getValues().getHrList(), this.activity.getValues().getMovingList()];
  }

  toggleSeries(idx: number) {
    const series = this.seriesKey.filter(x => x.index === idx)[0];
    series.enabled ? series.enabled = false : series.enabled = true;
  }

  receiveMessage($event) {
    console.log('received message');
    switch ($event.name) {
      case 'toggleSeries': {
        this.toggleSeries($event.payload);
        break;
      }
      case 'selectXAxis': {
        this.graph.setXAxis(this.xAxisFormat.get($event.payload));
        break;
      }
    }
  }




}
