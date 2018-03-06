import { Component, OnInit } from '@angular/core';
import {Activity} from '../../model/Activity_pb';
import {ActivityService} from '../../services/activity-service/activity.service';
import {Observable} from 'rxjs/Observable';

// TODO -> application and activity state need to be managed properly
@Component({
  selector: 'app-summary-panel-container',
  templateUrl: './summary-panel-container.component.html',
  styleUrls: ['./summary-panel-container.component.css']
})
export class SummaryPanelContainerComponent implements OnInit  {

  private activity: Observable<Activity>;
  private activityService: ActivityService;
  public  speedData: number[][];
  public  hrData: number[][];
  public activitySport: Array<string>;
  public activitySubSport: Array<string>;

  constructor(activityService: ActivityService) {
    this.activityService = activityService;
  }

  ngOnInit() {
    // this.activityService.getActivity( '1' ).subscribe( v => {
    //   this.activity = v;
    //   const res = [];
    //
    //   res[0] = this.activity.getValues().getSpeedList(); // .filter(d => Math.floor(d));
    //   res[0] = res[0].filter(d => ( d !== -999 ));
    //   this.speedData = res;
    //
    //   const hrres = [];
    //   hrres[0] = this.activity.getValues().getHrList(); // .filter(d => Math.floor(d));
    //   hrres[0] = hrres[0].filter(d => ( d !== -999 ));
    //   this.hrData = hrres;
    //
    //   console.log(this.activity.getSummary().getHasattributemapMap().getEntryList());
    // });
    this.activity = this.activityService.getActivity( '1' ).map(v => {
      const res = [];

      res[0] = v.getValues().getSpeedList(); // .filter(d => Math.floor(d));
      res[0] = res[0].filter(d => (d !== -999));
      this.speedData = res;
      v.getMeta().setCreatedts('2017-01-23T15:07:00');
      const hrres = [];
      hrres[0] = v.getValues().getHrList(); // .filter(d => Math.floor(d));
      hrres[0] = hrres[0].filter(d => (d !== -999));
      this.hrData = hrres;

      console.log(v.getSummary().getHasattributemapMap().getEntryList());
      return v;
    });
    this.activitySport = this.activityService.getActivitySport();
    this.activitySubSport = this.activityService.getActivitySubSport();
  }
}
