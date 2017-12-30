import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Activity} from '../model/Activity_pb';


@Injectable()
export class ActivityService implements OnInit {
  public ActivitySport: Array<string> = new Array<string>();
  public ActivitySubSport: Array<string> = new Array<string>();

  ngOnInit(): void {
  }


  constructor(protected http: HttpClient) {
  }

  getActivity(id: string) {
    // return this.http.get( 'https://s3-us-west-2.amazonaws.com/www.ski-analytics.com/run280317_0.pb', {responseType: 'arraybuffer'})
    return this.http.get('https://s3-us-west-2.amazonaws.com/www.ski-analytics.com/suunto_10.pb', {responseType: 'arraybuffer'})
      .map(res => {
        const activity =  Activity.deserializeBinary(new Uint8Array(res));
        return activity;
      });
  }

  getActivitySport() {

    if (this.ActivitySport.length === 0) {
      let i = 0;
      for (const v in Activity.Sport) {
        this.ActivitySport[i++] = v;
      }
    }
    return this.ActivitySport;
  }

  getActivitySubSport() {
    if (this.ActivitySubSport.length === 0) {
      let i = 0;
      for (const v in Activity.SubSport) {
        this.ActivitySubSport[i++] = v;
      }
    }
    return this.ActivitySubSport;
  }

}
