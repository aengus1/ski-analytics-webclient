import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Activity} from '../../model/Activity_pb';


@Injectable()
export class FetchActivityService {

  constructor (private http: HttpClient) { }

  getActivity() {
    // return this.http.get( 'https://s3-us-west-2.amazonaws.com/www.ski-analytics.com/run280317_0.pb', {responseType: 'arraybuffer'})
    return this.http.get( 'https://s3-us-west-2.amazonaws.com/www.ski-analytics.com/suunto_10.pb', {responseType: 'arraybuffer'})
      .map(res => Activity.deserializeBinary(new Uint8Array(res)));
  }
}
