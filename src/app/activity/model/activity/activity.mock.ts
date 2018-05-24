import {Activity} from './Activity_pb';
import Values = Activity.Values;
import Summary = Activity.Summary;

export class MockActivity {

  public static generateMockActivity() {

    const movingList: boolean[] = [false, false, true, true, true, false, true, false, false, true, true, true, true, true];
    const speedList: number[] = [0, 0, 1, 1.2, 1.7, 1.9, 3.4, 5.7, 7.5, 4.2, 0, 3.3, 9.0, 7.0];
    const altList: number[] = [400, 401, 405, 410, 407, 407, 406, 407, 409, 411, 414, 415, 417, 415];
    const hrList: number[] = [120, 121, 125, 140, 135, 137, 145, 150, 160, 161, 156, 135, 171, 155];
    const distList: number[] = [0,  0,    10,  15,  35,  40,  45,  47,  53,  57,  72,  77,  81, 97];
    const tsList: string[] = [
      '2018-01-01T00:00:00',
      '2018-01-01T00:00:01',
      '2018-01-01T00:00:02',
      '2018-01-01T00:00:03',
      '2018-01-01T00:00:04',
      '2018-01-01T00:00:05',
      '2018-01-01T00:00:06',
      '2018-01-01T00:00:07',
      '2018-01-01T00:00:08',
      '2018-01-01T00:00:09',
      '2018-01-01T00:00:10',
      '2018-01-01T00:00:11',
      '2018-01-01T00:00:12',
      '2018-01-01T00:00:13'
    ];

    const activity: Activity = new Activity();
    activity.setId('1');

    activity.setValues(new Values());
    activity.getValues().setSpeedList(speedList);
    activity.getValues().setAltitudeList(altList);
    activity.getValues().setDistanceList(distList);
    activity.getValues().setMovingList(movingList);
    activity.getValues().setTsList(tsList);
    activity.getValues().setHrList(hrList);

    activity.setSummary(new Summary());
    activity.getSummary().setMaxspeed(Math.max.apply(null, speedList));


    return activity;
  }


  public static generateMockActivityTwo() {

    const speedList: number[] = [12.0, 13.0, 0, 4.4, 3.6, 2.5];
    const activity: Activity = new Activity();
    activity.setId('2');
    activity.setValues(new Values());
    activity.getValues().setSpeedList(speedList);

    activity.setSummary(new Summary());
    activity.getSummary().setMaxspeed(Math.max.apply(null, speedList));

    return activity;
  }

}
