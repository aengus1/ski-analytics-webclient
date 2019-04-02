import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ChartOptions, ChartOrientation, YLabelFormat} from '../../../../chart/components/d3-bar/ChartOptions';
import {Activity} from '../../../model/activity/Activity_pb';
import {combineLatest, Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromActivity from '../../../reducers/index';
import {ActivitySummaryService} from '../../../services/activity-summary-service/activity-summary.service';

@Component({
  selector: 'app-hr-zone-histogram',
  template: `
    <!--<app-d3-bar [width]="150" [height]="150" [yLabel]="'mins'"
                [xLabels]="['1',' 2','3','4','5']" [chartOptions]="this.chartOptions"
                [data]="getTimeOrDistanceInZone()"></app-d3-bar> -->
    <app-d3-bar-native [width]="100" [height]="100" [yLabel]="'mins'" [margin]="15"
                [xLabels]="['1',' 2','3','4','5']" [chartOptions]="this.chartOptions"
                [data]="getTimeOrDistanceInZone()"></app-d3-bar-native>`,
  styleUrls: ['./hr-zone-histogram.component.css']
})
export class HrZoneHistogramComponent implements OnInit, OnChanges {

  public chartOptions: ChartOptions;

  public unfiltered$: Observable<Activity>;
  public tsLookup$: Observable<Map<string, number>>;

  @Input()
  public distTime = 0;  // 0 = time, 1 = distance

  @Input()
  public thresholds: number[];

  @Input()
  public activity: Activity;

  @Input()
  public tsList: number[];  // this is not actually used, but it is a shortcut to get angular to trigger change detection cycle


  public timeDistInZone: number[][];  // [0] = time, [1] = distance

  private initialized = false;

  constructor( private store: Store<fromActivity.State>, private activitySummaryService: ActivitySummaryService) {
    this.unfiltered$ = store.pipe(select(fromActivity.getUnfiltered));
    this.tsLookup$ = store.pipe(select(fromActivity.getTsLookup));
  }


  ngOnChanges() {
    console.log('calculating time in zone');
    if (this.initialized && this.activity !== undefined) {
      combineLatest(this.tsLookup$, this.unfiltered$).subscribe( (x: Array<any>) => {
        this.timeDistInZone = this.activitySummaryService.calculateTimeAndDistInZone(this.thresholds, this.activity, x[0], x[1]);
      });
    }
  }

  ngOnInit() {
    this.chartOptions = new ChartOptions();
    this.chartOptions.hasNumLabel = true;
    this.chartOptions.hasNumAxis = false;
    this.chartOptions.orientation = ChartOrientation.VERTICAL;
    this.chartOptions.barSpacing = 0;
    this.chartOptions.yLabelFormat = YLabelFormat.INTERVAL;
    this.chartOptions.hideZeroLabels = true;
    combineLatest(this.tsLookup$, this.unfiltered$).subscribe( (x: Array<any>) => {
      this.timeDistInZone = this.activitySummaryService.calculateTimeAndDistInZone(this.thresholds, this.activity, x[0], x[1]);
      this.initialized = true;
    });
  }


  getTimeOrDistanceInZone() {
    if (this.initialized) {
      return this.timeDistInZone[this.distTime];
    }
    return [];
  }
}
