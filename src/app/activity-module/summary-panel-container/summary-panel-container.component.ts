import { Component, OnInit } from '@angular/core';
import {Activity} from '../../model/Activity_pb';
import {ActivityService} from '../../services/activity-service/activity.service';

// TODO -> application and activity state need to be managed properly
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
    this.activityService.getActivity( '1' ).subscribe( v => {
      this.activity = v;
      const res = [];

      res[0] = this.activity.getValues().getSpeedList(); // .filter(d => Math.floor(d));
      res[0] = res[0].filter(d => ( d !== -999 ));
      this.speedData = res;
    });
  }
}
