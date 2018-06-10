import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Activity} from '../../model/activity/Activity_pb';
import {Observable} from 'rxjs';
import * as fromActivity from '../../reducers/activity.reducer';
import {ActivitySummaryService} from '../activity-summary-service/activity-summary.service';
import {map} from 'rxjs/operators';

@Injectable()
export class ActivityService implements OnInit {
  // public ActivitySport: Array<string> = new Array<string>();
  // public ActivitySubSport: Array<string> = new Array<string>();

  ngOnInit(): void {
  }


  constructor(protected http: HttpClient) {
  }

  getActivity(id: string): Observable<Activity> {
    // return this.http.get( 'https://s3-us-west-2.amazonaws.com/www.ski-analytics.com/27031720.pb', {responseType: 'arraybuffer'})
     return this.http.get( 'https://s3-us-west-2.amazonaws.com/www.ski-analytics.com/2612170.pb', {responseType: 'arraybuffer'})
    // return this.http.get( 'https://s3-us-west-2.amazonaws.com/www.ski-analytics.com/run280317_0.pb', {responseType: 'arraybuffer'})
      // return this.http.get('https://s3-us-west-2.amazonaws.com/www.ski-analytics.com/suunto_10.pb', {responseType: 'arraybuffer'})
       .pipe(map(res => Activity.deserializeBinary(new Uint8Array(res)))).pipe(map(v => {
        // console.log('hr list = ' + v.getValues().getHrList());
        v.setId('1');
             const res = [];

             // res[0] = v.getValues().getSpeedList(); // .filter(d => Math.floor(d));
             // res[0] = res[0].filter(d => (d !== -999));
             // this.speedData = res;
             // v.getMeta().setCreatedts('2017-01-23T15:07:00');
             // const hrres = [];
             // hrres[0] = v.getValues().getHrList(); // .filter(d => Math.floor(d));
             // hrres[0] = hrres[0].filter(d => (d !== -999));
             // // console.log('hrres = ' + hrres[0]);
             // v.getValues().setHrList(hrres);
        // console.log('hr: ' + v.getValues().getHrList());

           // res[0] = v.getValues().getSpeedList(); // .filter(d => Math.floor(d));
           // // res[0] = res[0].filter(d => ( d !== -999 ));
           // v.getValues().setSpeedList(res[0]);
           // console.log('ts = ' + v.getValues().getAltitudeList());
           // v.getValues().setSpeedList(res);

           //  v.getSummary().setMaxspeed(4.2);
            ActivitySummaryService.summarizeActivity(v, null, v, fromActivity.buildTsLookupMap(v));
            // console.log('total distance = ' + v.getSummary().getTotaldistance());
            //  console.log(v.getSummary().getHasattributemapMap().getEntryList());
             return v;
       }));
  }

  // getActivitySport() {
  //
  //   if (this.ActivitySport.length === 0) {
  //     let i = 0;
  //     for (const v in Activity.Sport) {
  //       this.ActivitySport[i++] = v;
  //     }
  //   }
  //   return this.ActivitySport;
  // }
  //
  // getActivitySubSport() {
  //   if (this.ActivitySubSport.length === 0) {
  //     let i = 0;
  //     for (const v in Activity.SubSport) {
  //       this.ActivitySubSport[i++] = v;
  //     }
  //   }
  //   return this.ActivitySubSport;
  // }

}
