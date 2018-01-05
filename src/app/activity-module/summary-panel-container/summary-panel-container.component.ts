import { Component, OnInit } from '@angular/core';
import {Activity} from "../../model/Activity_pb";
import {ActivityService} from "../../services/activity.service";


@Component({
  selector: 'app-summary-panel-container',
  templateUrl: './summary-panel-container.component.html',
  styleUrls: ['./summary-panel-container.component.css']
})
export class SummaryPanelContainerComponent implements OnInit  {

  private activity: Activity;
  private activityService: ActivityService;
  public  speedData: number[][];

  constructor(activityService: ActivityService) {
    this.activityService = activityService;
  }

  ngOnInit() {
    this.activityService.getActivity( "1" ).subscribe( v => {
      this.activity = v;
      const res = [];
      res[0] = this.activity.getValues().getSpeedList().filter(v => { return Math.floor(v);});
      this.speedData = res;
    });
  }
}
