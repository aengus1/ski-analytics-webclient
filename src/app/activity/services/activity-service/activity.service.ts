import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Activity} from '../../model/Activity_pb';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class ActivityService implements OnInit {
  // public ActivitySport: Array<string> = new Array<string>();
  // public ActivitySubSport: Array<string> = new Array<string>();

  ngOnInit(): void {
  }


  constructor(protected http: HttpClient) {
  }

  getActivity(id: string): Observable<Activity> {
     // return this.http.get( 'https://s3-us-west-2.amazonaws.com/www.ski-analytics.com/run280317_0.pb', {responseType: 'arraybuffer'})
     return this.http.get('https://s3-us-west-2.amazonaws.com/www.ski-analytics.com/suunto_10.pb', {responseType: 'arraybuffer'})
      .map(res => Activity.deserializeBinary(new Uint8Array(res))).map(v => {
        // console.log('hr list = ' + v.getValues().getHrList());
        v.setId('1');
             const res = [];

             res[0] = v.getValues().getSpeedList(); // .filter(d => Math.floor(d));
             res[0] = res[0].filter(d => (d !== -999));
             // this.speedData = res;
             v.getMeta().setCreatedts('2017-01-23T15:07:00');
             const hrres = [];
             hrres[0] = v.getValues().getHrList(); // .filter(d => Math.floor(d));
             hrres[0] = hrres[0].filter(d => (d !== -999));
             // console.log('hrres = ' + hrres[0]);
             v.getValues().setHrList(hrres);

           res[0] = v.getValues().getSpeedList(); // .filter(d => Math.floor(d));
           res[0] = res[0].filter(d => ( d !== -999 ));
           v.getValues().setSpeedList(res[0]);
           // v.getValues().setSpeedList(res);
            v.getSummary().setMaxspeed(1.9);
            // console.log('total distance = ' + v.getSummary().getTotaldistance());
            //  console.log(v.getSummary().getHasattributemapMap().getEntryList());
             return v;
       });
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
