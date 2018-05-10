import { Injectable } from '@angular/core';
import {Activity} from '../../model/activity/Activity_pb';
import * as _ from 'lodash';

@Injectable()
export class ActivitySummaryService {

  constructor() { }


  public static summarizeActivity(activity: Activity, filteredList: number[]) {
    ActivitySummaryService.calcAscentDescent(activity, filteredList);

  }


  /**
   * ASCENT is accumulated when consecutive readings have positive altitude change
   * DESCENT is accumulated when consecutive readings have negative altitude change
   * if flat, will continue to accumulate asc/desc for 1 iteration based on previous value
   * @param {Activity} activity
   * @param {number[]} filteredList
   */
  private static calcAscentDescent(activity: Activity, filteredList: number[]) {
    const filterSet = new Set(filteredList);
    const altValues: number[] = activity.getValues().getAltitudeList();
    const timeValues: Date[]  = _.map(activity.getValues().getTsList(), (x) => new Date(x));
    const distValues: number[] = activity.getValues().getDistanceList();
    let ascAccum = 0;
    let ascTimeAccum = 0;
    let ascDistAccum = 0;
    let descAccum = 0;
    let descTimeAccum = 0;
    let descDistAccum = 0;
    // memoize the trajectory.  If ascending and flatten out then continue to accumulate ascent time
    // -2=na, -1=desc, 0=flat, 1=asc
    let memo = -2;
    for (let i = 0; i < altValues.length - 1; i++) {
      if (filteredList == null || (filterSet.has(i) && filterSet.has(i + 1)) ) {
        if(altValues[i] !== -999 && altValues[i + 1] !== -999) {
          if (altValues[i + 1] > altValues[i]) {
            ascAccum += altValues[i + 1] - altValues[i];
            ascTimeAccum += (timeValues[i + 1].valueOf() - timeValues[i].valueOf());
            ascDistAccum += distValues[i + 1] - distValues[i];
            memo = 1;
          } else if (altValues[ i + 1] < altValues[i]) {
            descAccum += altValues[i + 1] - altValues[i];
            descTimeAccum += timeValues[i + 1].valueOf() - timeValues[i].valueOf();
            descDistAccum += distValues[i + 1] - distValues[i];
            memo = -1;
          } else {
            if (memo === 1) {
              ascAccum += altValues[i + 1] - altValues[i];
              ascTimeAccum += (timeValues[i + 1].valueOf() - timeValues[i].valueOf());
              ascDistAccum += distValues[i + 1] - distValues[i];
            }
            if (memo === -1) {
              descAccum += altValues[i + 1] - altValues[i];
              descTimeAccum += timeValues[i + 1].valueOf() - timeValues[i].valueOf();
              descDistAccum += distValues[i + 1] - distValues[i];
            }
            memo = 0;  // limit to one flat reading before stop counting
          }
        }
      }
    }
    activity.getSummary().setTotalascent(ascAccum);
    activity.getSummary().setTotalasctime(ascTimeAccum !== 0 ? (ascTimeAccum / 1000) : 0);
    activity.getSummary().setTotalascdist(ascDistAccum);
    activity.getSummary().setTotaldescent(Math.abs(descAccum));
    activity.getSummary().setTotaldesctime(descTimeAccum !== 0 ? (Math.abs(descTimeAccum) / 1000) : 0);
    activity.getSummary().setTotaldescdist(descDistAccum);
  }

}
