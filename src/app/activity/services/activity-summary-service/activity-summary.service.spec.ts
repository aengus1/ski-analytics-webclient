import {inject, TestBed} from '@angular/core/testing';

import {ActivitySummaryService} from './activity-summary.service';
import {Activity} from '../../model/activity/Activity_pb';
import {MockActivity} from '../../model/activity/activity.mock';
import * as fromActivity from '../../reducers/activity.reducer';
import {LoggerService} from '../../../shared/services/logger.service';

describe('ActivitySummaryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivitySummaryService, LoggerService]
    });
  });

  let activityf: Activity = MockActivity.generateMockActivity();
  // values at 6, 7, 9, 11 are filtered out
  activityf.getValues().getAltitudeList()[0] = NaN;
  activityf.getValues().getAltitudeList()[1] = NaN;
  activityf.getValues().getAltitudeList()[2] = NaN;
  activityf.getValues().getAltitudeList()[3] = NaN;
  activityf.getValues().getAltitudeList()[4] = NaN;
  activityf.getValues().getAltitudeList()[5] = NaN;
  activityf.getValues().getAltitudeList()[8] = NaN;
  activityf.getValues().getAltitudeList()[10] = NaN;
  activityf.getValues().getAltitudeList()[12] = NaN;
  activityf.getValues().getAltitudeList()[13] = NaN;

  activityf.getValues().getDistanceList()[0] = NaN;
  activityf.getValues().getDistanceList()[1] = NaN;
  activityf.getValues().getDistanceList()[2] = NaN;
  activityf.getValues().getDistanceList()[3] = NaN;
  activityf.getValues().getDistanceList()[4] = NaN;
  activityf.getValues().getDistanceList()[5] = NaN;
  activityf.getValues().getDistanceList()[8] = NaN;
  activityf.getValues().getDistanceList()[10] = NaN;
  activityf.getValues().getDistanceList()[12] = NaN;
  activityf.getValues().getDistanceList()[13] = NaN;

  activityf.getValues().getTsList()[0] = 'marker';
  activityf.getValues().getTsList()[1] = 'marker';
  activityf.getValues().getTsList()[2] = 'marker';
  activityf.getValues().getTsList()[3] = 'marker';
  activityf.getValues().getTsList()[4] = 'marker';
  activityf.getValues().getTsList()[5] = 'marker';
  activityf.getValues().getTsList()[8] = 'marker';
  activityf.getValues().getTsList()[10] = 'marker';
  activityf.getValues().getTsList()[12] = 'marker';
  activityf.getValues().getTsList()[13] = 'marker';

  activityf.getValues().getDistanceList().splice(12, 1);
  activityf.getValues().getAltitudeList().splice(12, 1);
  activityf.getValues().getTsList().splice(12, 1);
  activityf.getValues().getDistanceList().splice(0, 5);
  activityf.getValues().getAltitudeList().splice(0, 5);
  activityf.getValues().getTsList().splice(0, 5);
  console.log('dist: ' + activityf.getValues().getDistanceList());
  console.log('alt: ' + activityf.getValues().getAltitudeList());
  console.log('ts: ' + activityf.getValues().getTsList());

  it('should be created', inject([ActivitySummaryService], (service: ActivitySummaryService) => {
    expect(service).toBeTruthy();
  }));


  describe('Ascent calculation', () => {
    const activity: Activity = MockActivity.generateMockActivity();
    const unfiltered: Activity = MockActivity.generateMockActivity();
    const tsLookup: Map<string, number> = fromActivity.buildTsLookupMap(activity);
    const tsLookupf: Map<string, number> = fromActivity.buildTsLookupMap(unfiltered);
    ActivitySummaryService.summarizeActivity(activity, null, unfiltered, tsLookup);
    ActivitySummaryService.summarizeActivity(activityf, [6, 7, 9, 11], unfiltered, tsLookupf);

    it('should calculate ascent correctly when no filters are applied', () => {
      expect(activity.getSummary().getTotalascent()).toEqual(21);
    });

    it('should calculate ascent time correctly when no filters are applied', () => {
      expect(activity.getSummary().getTotalasctime()).toEqual(9);

    });

    it('should calculate ascent distance correctly when no filters are applied', () => {
      // [400, 401, 405, 410, 407, 407, 406, 407, 409, 411, 414, 415, 417, 415];
      expect(activity.getSummary().getTotalascdist()).toEqual(51);

    });

    it('should calculate ascent correctly when  filters are applied', () => {
      expect(activityf.getSummary().getTotalascent()).toEqual(8);

    });

    it('should calculate ascent time correctly when  filters are applied', () => {
      expect(activityf.getSummary().getTotalasctime()).toEqual(4);

    });

    it('should calculate ascent distance correctly when  filters are applied', () => {
      // [400, 401, 405, 410, 407, 407, 406, 407, 409, 411, 414, 415, 417, 415];
      // [0,  0,    10,  15,  35,  40,  45,  47,  53,  57,  72,  77,  81, 97];
      expect(activityf.getSummary().getTotalascdist()).toEqual(27);

    });

  });


  describe('Descent calculation', () => {
    const activity: Activity = MockActivity.generateMockActivity();
    const unfiltered: Activity = MockActivity.generateMockActivity();
    const tsLookup: Map<string, number> = fromActivity.buildTsLookupMap(activity);
    ActivitySummaryService.summarizeActivity(activity, null, unfiltered, tsLookup);
    it('should calculate descent correctly when no filters are applied', () => {
      expect(activity.getSummary().getTotaldescent()).toEqual(6);

    });

    it('should calculate descent time correctly when no filters are applied', () => {
      expect(activity.getSummary().getTotaldesctime()).toEqual(4);
    });

    it('should calculate descent distance correctly when no filters are applied', () => {
      expect(activity.getSummary().getTotaldescdist()).toEqual(46);

    });

    it('should calculate descent correctly when  filters are applied', () => {
      // ActivitySummaryService.summarizeActivity(activity, [6, 7, 9, 11], unfiltered, tsLookup);
      expect(activityf.getSummary().getTotaldescent()).toEqual(0);
    });

    it('should calculate descent time correctly when  filters are applied', () => {
      // ActivitySummaryService.summarizeActivity(activity, [6, 7, 9, 11], unfiltered, tsLookup);
      expect(activityf.getSummary().getTotaldesctime()).toEqual(0);

    });

    it('should calculate descent distance correctly when  filters are applied', () => {
      // ActivitySummaryService.summarizeActivity(activity, [6, 7, 9, 11], unfiltered, tsLookup);
      expect(activityf.getSummary().getTotaldescdist()).toEqual(0);

    });

  });

  describe(' Stop calculation', () => {
    const activity: Activity = MockActivity.generateMockActivity();
    let unfiltered: Activity = MockActivity.generateMockActivity();
    let tsLookup: Map<string, number> = fromActivity.buildTsLookupMap(activity);
    ActivitySummaryService.summarizeActivity(activity, null, unfiltered, tsLookup);

    it('should calculate stop time correctly when no filters are applied', () => {
      expect(activity.getSummary().getTotalstopped()).toEqual(3);
    });

    it('should calculate stop time correctly when filters are applied', () => {
       activityf = MockActivity.generateMockActivity();
       unfiltered = MockActivity.generateMockActivity();
       tsLookup = fromActivity.buildTsLookupMap(unfiltered);
      // values at 6, 7, 9, 11 are filtered out
      activityf.getValues().getSpeedList()[6] = NaN;
      activityf.getValues().getSpeedList()[7] = NaN;
      activityf.getValues().getSpeedList()[9] = NaN;
      activityf.getValues().getSpeedList()[11] = NaN;
      activityf.getValues().getTsList()[6] = 'marker';
      activityf.getValues().getTsList()[7] = 'marker';
      activityf.getValues().getTsList()[9] = 'marker';
      activityf.getValues().getTsList()[11] = 'marker';
      activityf.getValues().getSpeedList().splice(7, 1);
      activityf.getValues().getTsList().splice(7, 1);
      ActivitySummaryService.summarizeActivity(activityf, [0, 1, 2, 3, 4, 5, 8, 10, 12, 13], unfiltered, tsLookup);
      expect(activityf.getSummary().getTotalstopped()).toEqual(3);
    });

    // TODO -> calculate stop count from summaries and re-enable these tests
    // it('should calculate stop count correctly - with leading stop that is ignored', () => {
    //   tsLookup = fromActivity.buildTsLookupMap(activity);
    //   ActivitySummaryService.summarizeActivity(activity, null, activity, tsLookup);
    //   expect(activity.getSummary().getStopcount()).toEqual(2);
    // });

    // it('should calculate stop count correctly - with trailing stop that is counted', () => {
    //   const movingList: number[] = [0, 0,  2, 3, 4, 0, 8, 0, 0, 13, 7, 9, 3, 0];
    //   activity.getValues().setSpeedList(movingList);
    //   ActivitySummaryService.summarizeActivity(activity, null, activity, tsLookup);
    //   expect(activity.getSummary().getStopcount()).toEqual(3);
    // });


  });

  // uses speed list and moving_threshold instead of activity.getValues().getMovingList()
  describe(' Moving calculation', () => {
    const activity: Activity = MockActivity.generateMockActivity();
    const unfiltered: Activity = MockActivity.generateMockActivity();
    const tsLookup: Map<string, number> = fromActivity.buildTsLookupMap(activity);
    ActivitySummaryService.summarizeActivity(activity, null, unfiltered, tsLookup);

    it('should calculate moving time correctly when no filters are applied', () => {
      expect(activity.getSummary().getTotalmoving()).toEqual(10);
    });

    it('should calculate moving time correctly when filters are applied', () => {
       activityf = MockActivity.generateMockActivity();
      activityf.getValues().getSpeedList()[6] = NaN;
      activityf.getValues().getSpeedList()[7] = NaN;
      activityf.getValues().getSpeedList()[9] = NaN;
      activityf.getValues().getSpeedList()[11] = NaN;
      activityf.getValues().getTsList()[6] = 'marker';
      activityf.getValues().getTsList()[7] = 'marker';
      activityf.getValues().getTsList()[9] = 'marker';
      activityf.getValues().getTsList()[11] = 'marker';
      activityf.getValues().getSpeedList().splice(7, 1);
      activityf.getValues().getTsList().splice(7, 1);
      ActivitySummaryService.summarizeActivity(activityf, [6, 7, 9, 11], unfiltered, tsLookup);
      expect(activityf.getSummary().getTotalmoving()).toEqual(9);
    });

  });

  // describe(' Pause calculation', () => {
  //
  // });

  describe(' Heart Rate Zone  Time Calculation', () => {
    const activity: Activity = MockActivity.generateMockActivity();
    const unfiltered: Activity = MockActivity.generateMockActivity();
    const hrThresholds = [120, 140, 160, 170];
    // hr: 120, 121, 125, 140, 135, 137, 145, 150, 160, 161, 156, 135, 171, 155];
    // zone: 2,  2, 2, 3, 2, 2, 3, 3, 4, 4, 3, 2, 5, <n/a>
    // sum: 0 , 6, 4, 2, 1
    const tsLookup = new Map<string, number>();
    unfiltered.getValues().getTsList().forEach( (v, i) => tsLookup.set(v, i));
    const logger: LoggerService = new LoggerService();
    const service: ActivitySummaryService = new ActivitySummaryService(logger);

    it('should sum time in zone correctly for an activity with no filters', () => {
       const result = service.calculateTimeAndDistInZone(hrThresholds, activity, tsLookup, unfiltered);
      expect(result[0]).toEqual([0, 6, 4, 2, 1]);
    });

    it('should sum time in zone correctly for an activity with filters', () => {
        // filter points at index 6, 7, 9, 11
      activity.getValues().getTsList()[6] = 'marker';
      activity.getValues().getTsList()[7] = 'marker';
      activity.getValues().getTsList()[9] = 'marker';
      activity.getValues().getTsList()[11] = 'marker';
      activity.getValues().getHrList()[6] = NaN;
      activity.getValues().getHrList()[7] = NaN;
      activity.getValues().getHrList()[9] = NaN;
      activity.getValues().getHrList()[11] = NaN;
      activity.getValues().getDistanceList()[6] = NaN;
      activity.getValues().getDistanceList()[7] = NaN;
      activity.getValues().getDistanceList()[9] = NaN;
      activity.getValues().getDistanceList()[11] = NaN;
       activity.getValues().getHrList().splice(7, 1);  // delete 7th index as filtering will compress NaNs
       activity.getValues().getDistanceList().splice(7, 1);
       activity.getValues().getTsList().splice(7, 1);

      // hr: 120, 121, 125, 140, 135, 137, 145f, 150f, 160, 161f, 156, 135f, 171, 155];
      // zone: 2, 2, 2, 3, 2, 2, 3f, 3f, 4, 4f, 3, 2f, 5, <n/a>
      // sum: 0 , 5, 2, 1, 1

      const result = service.calculateTimeAndDistInZone(hrThresholds, activity, tsLookup, unfiltered);
      expect(result[0]).toEqual([0, 5, 2, 1, 1]);


    });

    it('should  handle last point in series being filtered', () => {
      activity.getValues().getTsList()[12] = 'marker';  // last index is 12 after 7 was deleted above
      activity.getValues().getDistanceList()[12] = NaN;
      activity.getValues().getHrList()[12] = NaN;
      const result = service.calculateTimeAndDistInZone(hrThresholds, activity, tsLookup, unfiltered);
      expect(result[0]).toEqual([0, 5, 2, 1, 1]);
    });
  });

  // todo -> replicate the tests for time
    describe(' Heart Rate Zone  Distance Calculation', () => {
    it( 'should sum distance  in zone correctly for an activity with no filters', () => {

    });

  });
});
