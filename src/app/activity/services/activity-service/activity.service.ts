import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Activity} from '../../model/activity/Activity_pb';
import {Observable} from 'rxjs';
import * as fromActivity from '../../reducers/activity.reducer';
import {ActivitySummaryService} from '../activity-summary-service/activity-summary.service';
import {map} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import * as fromAuth from '../../../auth/reducers/';
import {User} from '../../../auth/model/user';

@Injectable()
export class ActivityService {
  // public ActivitySport: Array<string> = new Array<string>();
  // public ActivitySubSport: Array<string> = new Array<string>();
  public user$:  Observable<User>;
  public sessionKey: string;


  constructor(protected http: HttpClient, private store: Store<fromAuth.State>) {

    console.log('initing activity service');
    this.user$ = this.store.pipe(select(fromAuth.getUser));
    this.user$.subscribe(x => {
      console.log('user finally returned with ' + x);
      try {
        this.sessionKey = x.signInUserSession.accessToken.jwtToken;
        console.log('setting session key = ' + this.sessionKey);
      }catch (e) {
        console.log('failed to set session key');
      }
    });

  }
// TODO -> cache user token in localStorage or cookie so it survives full page refresh

  getActivity(id: string): Observable<Activity> {
console.log('in getActivity with ' + this.sessionKey);

let resultActivity$: Observable<Activity>;
    this.user$.subscribe(x => {
      console.log('user finally returned with ' + x);
      try {
        this.sessionKey = x.signInUserSession.idToken.jwtToken;
        resultActivity$ = this.http.get(
          'https://fgtcxjggck.execute-api.ca-central-1.amazonaws.com/staging/activity/ce1cdd5f-20ee-497f-b1af-e6de11e6707c.pbf',
          { headers: {'Authorization' :  this.sessionKey}, responseType: 'arraybuffer'})
        // return this.http.get( 'https://s3-us-west-2.amazonaws.com/www.ski-analytics.com/run280317_0.pb', {responseType: 'arraybuffer'})
        // return this.http.get('https://s3-us-west-2.amazonaws.com/www.ski-analytics.com/suunto_10.pb', {responseType: 'arraybuffer'})
          .pipe(map(res => Activity.deserializeBinary(new Uint8Array(res)))).pipe(map(v => {
            // console.log('hr list = ' + v.getValues().getHrList());
            v.setId('1');
            // v.getMeta().getLocation().setDisplayname('McCullough Ski Trails, Kelowna, BC');
            // if(v.getSessionsList().length > 0) {
            //   v.getSessionsList()[0].setSport(Sport.CROSS_COUNTRY_SKIING);
            //   v.getSessionsList()[0].setSubsport(SubSport.SKATE_XC);
            // } else {
            //   console.log('sessions is empty');
            // }
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
        console.log('setting session key = ' + this.sessionKey);
      }catch (e) {
        console.log('failed to set session key');
      }
    });

    return resultActivity$;

    // // return this.http.get( 'https://s3-us-west-2.amazonaws.com/www.ski-analytics.com/27031720.pb', {responseType: 'arraybuffer'})
    //  return this.http.get(
    //  'https://fgtcxjggck.execute-api.ca-central-1.amazonaws.com/staging/activity/b9a90594-b8aa-4440-8ab0-c786924e1d7b.pbf',
    //    { headers: {'Authorization' :  this.sessionKey}, responseType: 'arraybuffer'})
    // // return this.http.get( 'https://s3-us-west-2.amazonaws.com/www.ski-analytics.com/run280317_0.pb', {responseType: 'arraybuffer'})
    //   // return this.http.get('https://s3-us-west-2.amazonaws.com/www.ski-analytics.com/suunto_10.pb', {responseType: 'arraybuffer'})
    //    .pipe(map(res => Activity.deserializeBinary(new Uint8Array(res)))).pipe(map(v => {
    //     // console.log('hr list = ' + v.getValues().getHrList());
    //     v.setId('1');
    //     v.getMeta().getLocation().setDisplayname('McCullough Ski Trails, Kelowna, BC');
    //      v.getSessionsList().pop().setSport(Sport.CROSS_COUNTRY_SKIING);
    //     v.getSessionsList().pop().setSubsport(SubSport.SKATE_XC);
    //     v.getValues().setTemperatureList([-21, -22]);
    //          const res = [];
    //
    //          // res[0] = v.getValues().getSpeedList(); // .filter(d => Math.floor(d));
    //          // res[0] = res[0].filter(d => (d !== -999));
    //          // this.speedData = res;
    //          // v.getMeta().setCreatedts('2017-01-23T15:07:00');
    //          // const hrres = [];
    //          // hrres[0] = v.getValues().getHrList(); // .filter(d => Math.floor(d));
    //          // hrres[0] = hrres[0].filter(d => (d !== -999));
    //          // // console.log('hrres = ' + hrres[0]);
    //          // v.getValues().setHrList(hrres);
    //     // console.log('hr: ' + v.getValues().getHrList());
    //
    //        // res[0] = v.getValues().getSpeedList(); // .filter(d => Math.floor(d));
    //        // // res[0] = res[0].filter(d => ( d !== -999 ));
    //        // v.getValues().setSpeedList(res[0]);
    //        // console.log('ts = ' + v.getValues().getAltitudeList());
    //        // v.getValues().setSpeedList(res);
    //
    //        //  v.getSummary().setMaxspeed(4.2);
    //         ActivitySummaryService.summarizeActivity(v, null, v, fromActivity.buildTsLookupMap(v));
    //         // console.log('total distance = ' + v.getSummary().getTotaldistance());
    //         //  console.log(v.getSummary().getHasattributemapMap().getEntryList());
    //          return v;
    //    }));
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
