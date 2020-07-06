import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Activity} from '../../model/activity/Activity_pb';
import {Observable} from 'rxjs';
import * as fromActivity from '../../reducers/activity.reducer';
import {ActivitySummaryService} from '../activity-summary-service/activity-summary.service';
import {map, switchMap} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import * as _ from 'lodash';


@Injectable()
export class ActivityService {
  // public sessionKey: string;


  constructor(protected http: HttpClient) {

  }

  /**
   * observable wrapper around FileReader interface
   * https://gist.github.com/iansinnott/3d0ba1e9edc3e6967bc51da7020926b0
   * @param blob
   */
  private readFile = (blob: Blob): Observable<ArrayBuffer> => Observable.create(obs => {
    if (!(blob instanceof Blob)) {
      obs.error(new Error('`blob` must be an instance of File or Blob.'));
      return;
    }

    const reader = new FileReader();
    let encoded = null;

    reader.onerror = err => {
      console.log('error thrown reading file ' + err);
      obs.error(err);
    };
    reader.onabort = err => obs.error(err);
    reader.onload = () => {
      encoded = reader.result;
      obs.next(encoded);
    };

    reader.onloadend = () => obs.complete();

    return reader.readAsArrayBuffer(blob);
  })

  importActivity(fileList: Array<File>): Observable<Object> {
    if (fileList.length === 1) {
      return this.readFile(fileList[0])
        .pipe(switchMap(x => {
          return this.http.put(
            environment.api + 'activity',
            x,
            {
              headers: {'Content-Type': 'application/fit'},
              responseType: 'json'
            }
          );
        }));
    } else {
      console.error(' batch import not yet supported');
      return null;
    }

  }


  getActivity(id: string): Observable<Activity> {
    // console.log('in getActivity with ' + this.sessionKey);

    let resultActivity$: Observable<Activity>;
    try {
      const idToFetch: string = id === '1' ? 'b2e2ff3d-1836-48cb-be61-30f06b4b0c0b' : id;
      resultActivity$ = this.http.get(
        environment.api + 'activity/' + idToFetch + '.pbf',
        {
          responseType: 'arraybuffer'
        })
        .pipe(map(res => Activity.deserializeBinary(new Uint8Array(res)))).pipe(map(v => {
          // hack for demo activity
          if (v.getId() === undefined || v.getId() == null) {
            v.setId('1');
          }
          v.getValues().setTemperatureList( [-21, -22] );
          ActivitySummaryService.summarizeActivity(v, null, v, fromActivity.buildTsLookupMap(v));
          return v;
        }));
      // console.log('setting session key = ' + this.sessionKey);
    } catch (e) {
      console.log('failed to set session key');
    }

    return resultActivity$;
  }
}
