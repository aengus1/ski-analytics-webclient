import {Activity} from './Activity_pb';
import Values = Activity.Values;
import Summary = Activity.Summary;

export class MockActivity {

  public static generateMockActivity() {

    const speedList: number[] = [0, 0, 1, 1.2, 1.7, 1.9, 3.4, 5.7, 7.5, 4.2, 0, 3.3, 9.0, 7.0];

    const activity: Activity = new Activity();
    activity.setId('1');

    activity.setValues(new Values());
    activity.getValues().setSpeedList(speedList);

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
