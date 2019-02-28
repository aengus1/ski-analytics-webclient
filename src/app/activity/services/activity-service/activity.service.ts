import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Activity} from '../../model/activity/Activity_pb';
import {Observable} from 'rxjs';
import * as fromActivity from '../../reducers/activity.reducer';
import {ActivitySummaryService} from '../activity-summary-service/activity-summary.service';
import {map} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import * as fromLogin from '../../../auth/reducers';
import {User} from '../../../auth/model/user';
import SubSport = Activity.SubSport;
import Sport = Activity.Sport;

@Injectable()
export class ActivityService implements OnInit {
  // public ActivitySport: Array<string> = new Array<string>();
  // public ActivitySubSport: Array<string> = new Array<string>();
  public user$:  Observable<User>;
  public sessionKey: string;

  ngOnInit(): void {
    console.log('initing activity service');
    this.user$ = this.store.pipe(select(fromLogin.getUser));
    this.user$.subscribe(x => {
      this.sessionKey = x.signInUserSession.accessToken.jwtToken;
      console.log('setting session key = ' + this.sessionKey);
    });
  }


  constructor(protected http: HttpClient, private store: Store<fromLogin.State>) {

    // this.sessionKey = 'eyJraWQiOiI1OE1cL0w5SjhJQm5yVnZieEVwTFFydVJKeFBmcXdDRWNuTkNrWjFLWE96Zz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxYzJmNThkMC1kYzRmLTQyMGItYTIwNi0yY2I1OGYyOTkxNjkiLCJhdWQiOiI3NTVmNWQwZWxzZzVpZTk2MTE2NTQwcW0zdSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZXZlbnRfaWQiOiJkMzE3OTUwYi0zYjE5LTExZTktYjQ2NS02NzExM2MwOTc5YTkiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTU1MTMzMTc3MSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tXC91cy13ZXN0LTJfRnJIMFVkck56IiwiY29nbml0bzp1c2VybmFtZSI6IjFjMmY1OGQwLWRjNGYtNDIwYi1hMjA2LTJjYjU4ZjI5OTE2OSIsImV4cCI6MTU1MTMzNTM3MSwiaWF0IjoxNTUxMzMxNzcxLCJlbWFpbCI6InRlc3REZXZVc2VyQHRlc3QuY29tIn0.T-ntUV4qY0h6pJyg8bT6FHO13vs04opYbZusJMhpZ1x3pGouF3tUwZ8N4BfkafyJJt8jC4qLx-Ne2c2aZQzkHVoIa6oLwqR1Fw5pVyYN92hUBFoX4EmJSvMuKFCHIsWvx9i8-sbO3tQmDYV0zcsOQmqz2ML0dt1C5ImcJ2kcshfiITEQ6tmIKI7eeva3b4DtjBlBt850vWy49LenPVcqKw1jpoqVBzXxLypmVrsDMI42l6zmgoxL3k3SDTHYU6PBLkKVO_9zuJCcw9XrVPeVGQJ5BsrIGK4WNrBt3KGTU3dm7VJhXMHMyPga-Jk3GxQ5cDMFrs3Pl_Aj1TxEXP5_Zw';

  }

  getActivity(id: string): Observable<Activity> {

    
     // return this.http.get( 'https://s3-us-west-2.amazonaws.com/www.ski-analytics.com/27031720.pb', {responseType: 'arraybuffer'})
     return this.http.get( 'https://fgtcxjggck.execute-api.ca-central-1.amazonaws.com/staging/activity/b9a90594-b8aa-4440-8ab0-c786924e1d7b.pbf',
       { headers: {'Authorization' :  this.sessionKey}, responseType: 'arraybuffer'})
    // return this.http.get( 'https://s3-us-west-2.amazonaws.com/www.ski-analytics.com/run280317_0.pb', {responseType: 'arraybuffer'})
      // return this.http.get('https://s3-us-west-2.amazonaws.com/www.ski-analytics.com/suunto_10.pb', {responseType: 'arraybuffer'})
       .pipe(map(res => Activity.deserializeBinary(new Uint8Array(res)))).pipe(map(v => {
        // console.log('hr list = ' + v.getValues().getHrList());
        v.setId('1');
        v.getMeta().getLocation().setDisplayname('McCullough Ski Trails, Kelowna, BC');
         v.getSessionsList().pop().setSport(Sport.CROSS_COUNTRY_SKIING);
        v.getSessionsList().pop().setSubsport(SubSport.SKATE_XC);
        v.getValues().setTemperatureList([-21, -22]);
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
