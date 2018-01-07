import { Component, OnInit } from '@angular/core';
import {ActivityService} from '../../services/activity-service/activity.service';
import {Activity} from '../../model/Activity_pb';

@Component({
  selector: 'app-activity-graph-container',
  templateUrl: './activity-graph-container.component.html',
  styleUrls: ['./activity-graph-container.component.css']
})
export class ActivityGraphContainerComponent implements OnInit {


  private activity: Activity;
  private activityService: ActivityService;
  private speedData: number[][];

  constructor(activityService: ActivityService) {
    this.activityService = activityService;
  }

  ngOnInit() {
     this.activityService.getActivity( '1' ).subscribe( v => {
       this.activity = v;
       const res = [];
       res[0] = this.activity.getValues().getSpeedList().filter(v => Math.floor(v));
       this.speedData = res;
     });
  }





}
