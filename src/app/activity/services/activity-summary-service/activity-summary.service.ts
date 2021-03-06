import {Injectable} from '@angular/core';
import {Activity} from '../../model/activity/Activity_pb';

import {LoggerService} from '../../../shared/services/logger.service';

@Injectable()
export class ActivitySummaryService {

  constructor(private logger: LoggerService) {
  }
  /**
   * Summarizes activity
   * @param {Activity} activity the activity to summarize
   * @param {number[]} filteredList a list of value indices to include in summarization (deprecated)
   * @param {Activity} unfilteredActivity
   * @param {Map<string, number>} tsLookup lookup table.  This provides a lookup of timestamps to index in original unfiltered array.
   * Required so that the interval between a non-filtered and a filtered value can be calculated
   */
 public static summarizeActivity(activity: Activity, filteredList: number[],
                                 unfilteredActivity: Activity, tsLookup: Map<string, number>) {
    ActivitySummaryService.calcAscentDescent(activity,  unfilteredActivity, tsLookup);
    ActivitySummaryService.calcStopPauseMovingTime(activity, filteredList, unfilteredActivity, tsLookup);

  }


  // TODO implement pause.  device file-format specific so need to do more analysis first
  /**
   * 1 -> 0  (moving to stop)  counted as moving
   * 0 -> 1  (stop to moving) counted as stop
   * @param {} activity
   * @param {number[]} filteredList value indices to include
   */
  private static calcStopPauseMovingTime(activity: Activity, filteredList: number[], unfiltered: Activity,
                                         tsLookup: Map<string, number>) {
    const movingValues: number[] = activity.getValues().getSpeedList();
    const ts: string[] = activity.getValues().getTsList();
    const distValues: number[] = activity.getValues().getDistanceList();
    const MOVING_THRESHOLD = 0.6;
    let movingTime = 0;
    let stopTime = 0;
    let stopCount = 0;
    let pauseTime = 0;
    let movingDist = 0;
    let pauseDist = 0;
    let ptAFiltered = false;
    let ptBFiltered = false;
    for (let i = 0; i < movingValues.length - 1; i++) {
      if (ts[i] === 'marker') {
        if (i === 0) {  // if first pt in series is filtered then don't sum moving or stopped
          continue;
        }
        ptAFiltered = true;
      }
      if (ts[i + 1] === 'marker') {
        ptBFiltered = true;
      }

      if (ptAFiltered && ptBFiltered) {
        console.log(' a and b filtered ' + ts);
        // this.logger.warn('[ActivitySummaryService calcStopPauseMovingTime], assertion failed -> contiguous values are both filtered');
        continue;  // we should never get here
      }

      // if ptA is filtered then no timestamp for this point is available in the activity - it has been replaced with 'marker'.
      // The marker in the filtered activity is required so that we don't sum time across filtered out readings when calculating aggregates
      // across the activity - e.g. time in hr zone.  For moving / stop calculations we need to know the timestamp of filtered readings
      // because we only want to exclude the time interval between two consecutive filtered points, i.e. f to f.
      // stop to f should be counted as stop, moving to f should be counted as moving, f to stop should be counted as motion state of f etc
      // see SKI-90 comments for more details.
      // To get the timestamp of the filtered value we are looking it up in the unfiltered activity.
      // because filtered activities remove consecutive readings we can't do a straight lookup by index, so it is done
      // using a timestamp-index lookup map, grabbing the ts of the 'next' pt in filtered activity.
      const t0: number = ptAFiltered && i !== 0
      ? new Date(unfiltered.getValues().getTsList()[tsLookup.get(ts[i + 1]) - 1]).valueOf()
        : new Date(ts[i]).valueOf();

      const t1: number = ptBFiltered
        ? new Date(unfiltered.getValues().getTsList()[tsLookup.get(ts[i]) + 1]).valueOf()
        : new Date(ts[i + 1]).valueOf();

      const d0: number = ptAFiltered && i !== 0
      ? unfiltered.getValues().getDistanceList()[tsLookup.get(ts[i + 1]) - 1]
        : distValues[i];

      const d1: number = ptBFiltered
        ? unfiltered.getValues().getDistanceList()[tsLookup.get(ts[i]) + 1]
        : distValues[i + 1];

      const m0: number = ptAFiltered && i !== 0
        ? unfiltered.getValues().getSpeedList()[tsLookup.get(ts[i + 1]) - 1]
        : movingValues[i];

      const m1: number = ptBFiltered
        ? unfiltered.getValues().getSpeedList()[tsLookup.get(ts[i]) + 1]
        : movingValues[i + 1];

        if (m0 > MOVING_THRESHOLD) {
          movingTime += (t1 - t0);
          movingDist += (d1 - d0);
        } else {
          stopTime += (t1 - t0);
        }
        if ( m1 >= MOVING_THRESHOLD && m0 < MOVING_THRESHOLD) {
          stopCount++;
        }
        ptAFiltered = false;
        ptBFiltered = false;
    }
    activity.getSummary().setTotalmoving(movingTime !== 0 ? movingTime / 1000 : 0);
    activity.getSummary().setTotalstopped(stopTime !== 0 ? stopTime / 1000 : 0);
    // console.log('data = ' + activity.getValues().getMovingList());
    // console.log('moving = ' + activity.getSummary().getTotalmoving() + ', stopped: ' + activity.getSummary().getTotalstopped());
    activity.getSummary().setStopcount(stopCount);
  }

  /**
   * ASCENT is accumulated when consecutive readings have positive altitude change
   * DESCENT is accumulated when consecutive readings have negative altitude change
   * if flat, will continue to accumulate asc/desc for 1 iteration based on previous value
   * @param {Activity} activity
   * @param {Activity} the unfiltered activity used to get the original distance and timestamp of filtered values
   * @param {Map<string, number>} lookup table.  This provides a lookup of timestamps to index in original unfiltered array.
   * Required so that the interval between a non-filtered and a filtered value can be calculated
   */
  private static calcAscentDescent(activity: Activity,  unfiltered: Activity, tsLookup: Map<string, number>) {

    let ascent = 0;
    let descent = 0;
    let ascentTime = 0;
    let ascentDist = 0;
    let descentTime = 0;
    let descentDist = 0;
    let ptBFiltered = false;
    let isAscending = 0;
    const alt = activity.getValues().getAltitudeList();
    const dist = activity.getValues().getDistanceList();
    const ts: string[] = activity.getValues().getTsList();

    for (let i = 0; i < alt.length - 1; i++) {
      if (ts[i] === 'marker') {
        // if ptA is filtered then continue without summing
          continue;
      }
      if (ts[i + 1] === 'marker') {
        ptBFiltered = true;
      }


      const ts0: number = new Date(ts[i]).valueOf();

      const ts1: number = ptBFiltered
        ? new Date(unfiltered.getValues().getTsList()[tsLookup.get(ts[i]) + 1]).valueOf()
        : new Date(ts[i + 1]).valueOf();

      const d0: number = dist[i];

      const d1: number = ptBFiltered
        ? unfiltered.getValues().getDistanceList()[tsLookup.get(ts[i]) + 1]
        : dist[i + 1];

      const m0: number =  alt[i];

      const m1: number = ptBFiltered
        ? unfiltered.getValues().getAltitudeList()[tsLookup.get(ts[i]) + 1]
        : alt[i + 1];


      // if flat, assume still ascending or descending for 1 iteration
      if (m1 === m0) {
        if (isAscending === 1) {
          ascent += (m1 - m0);
          ascentTime += (ts1 - ts0) / 1000;
          ascentDist += (d1 - d0);
          isAscending = 0;
        } else if (isAscending === -1) {
          descent += m1 - m0;
          descentTime += (ts1 - ts0) / 1000;
          descentDist += (d1 - d0);
          isAscending = 0;
        }
      }

      if (m1 > m0) {
        ascent += (m1 - m0);
        ascentTime += (ts1 - ts0) / 1000;
        ascentDist += (d1 - d0);
        isAscending = 1;
      }
      if (m1 < m0) {
        descent += (m1 - m0);
        descentTime += (ts1 - ts0) / 1000;
        descentDist += (d1 - d0);
        isAscending = -1;
      }
      ptBFiltered = false;
    }
    activity.getSummary().setTotalascent(ascent);
    activity.getSummary().setTotalasctime(ascentTime);
    activity.getSummary().setTotalascdist(ascentDist);
    activity.getSummary().setTotaldescent(Math.abs(descent));
    activity.getSummary().setTotaldesctime(descentTime);
    activity.getSummary().setTotaldescdist(descentDist);

  }

  /**
   * Calculates the time and distance spent in each HR Zone.  This is not calculated ordinarily as part of activity summary
   * because it requires additional input of user HR zone data.
   *
   * Do pairwise comparison between points in series.  Attribute HR zone to 1st point in pair.
   * If pt A is filtered out - do not sum, if Pt B is filtered out, do sum
   *
   * @param {number[4]} hrThresholds the heart rate zone thresholds.
   * Zone 1 = 0 to [0]
   * Zone 2 = [0] to [1]
   * Zone 3 = [1] to [2]
   * Zone 4 = [3] to [4]
   * Zone 5 =  >[4]
   * @param {Activity} activity the activity to sum dist and time in zones for
   * @param {Map<string, number>} lookup table.  This provides a lookup of timestamps to index in original unfiltered array.
   * Required so that the interval between a non-filtered and a filtered value can be calculated
   * @param {Activity} the unfiltered activity used to get the original distance and timestamp of filtered values
   * @returns {number[4][4]} total time [0] and total distance [1] in each zone 1 to 5
   */
  public calculateTimeAndDistInZone(hrThresholds: number[], activity: Activity, tsLookup: Map<string, number>,
                                    unfiltered: Activity): number[][] {

    let foundZone = false;
    let zone = 1;
    const result: number[][] = [ [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
    let ptBFiltered = false;
    const hrs = activity.getValues().getHrList();
    const dist = activity.getValues().getDistanceList();
    const ts: string[] = activity.getValues().getTsList();

    // time in zone
      for (let i = 0; i < hrs.length - 1; i++) {
        if (ts[i] === 'marker') {
          continue; // don't sum the attribute if 1st point is filtered out
        }
        if (ts[i + 1] === 'marker') {
          ptBFiltered = true; // mark point B for lookup
        }
        foundZone = false;
        zone = 1;
        const ts0: number = new Date(ts[i]).valueOf();
        // if ptB is filtered, the ts array value === marker, so have to look up the timestamp from unfiltered activity
        const ts1: number = ptBFiltered
          ? new Date(unfiltered.getValues().getTsList()[tsLookup.get(ts[i]) + 1]).valueOf()
          : new Date(ts[i + 1]).valueOf();

        const d0: number = dist[i];
        const d1: number = ptBFiltered
          ? unfiltered.getValues().getDistanceList()[tsLookup.get(ts[i]) + 1]
          : dist[i + 1];

        // point is in zone 1
        if (hrs[i] < hrThresholds[0]) {
          result[0][0] += (ts1 - ts0) / 1000;
          result[1][0] += (d1 - d0);
          foundZone = true;
          continue;
        }
        // point not in zone 1.. keep searching
        while (!foundZone && zone++ <= 4) {
          if (hrs[i] >= hrThresholds[zone - 2] && hrs[i] < hrThresholds[zone - 1]) {
            result[0][zone - 1] += (ts1 - ts0) / 1000;
            result[1][zone - 1] += (d1 - d0);
            foundZone = true;
            continue;
          }
        }
        // point is in zone 5
        if (!foundZone && hrs[i] >= hrThresholds[3]) {
          result[0][4] += (ts1 - ts0) / 1000;
          result[1][4] += (d1 - d0);
          foundZone = true;
          continue;
        }
      }
      // console.log('data = ' + data);
      return result;
    }


    // TODO -> server-side work to calc initial grade list (based on map?)
  // TODO -> abstract the calcTimeAndDist function so used by zone and grade
    public calculateTimeAndDistAtGrade(activity: Activity, tsLookup: Map<string, number>, unfiltered: Activity): number[][] {
    return null;
    }

}
