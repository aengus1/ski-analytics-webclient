import {HrzoneFilter} from './hrzone-filter';
import {MockActivity} from '../../../model/activity/activity.mock';
import {Activity} from '../../../model/activity/Activity_pb';
import * as _ from 'lodash';
import {AbstractActivityFilter} from '../abstract-activity-filter';

let activity: Activity;
let actClone: Activity;

describe('HrzoneFilter', () => {
  beforeEach(() => {
    activity = MockActivity.generateMockActivity();
     actClone = _.cloneDeep(activity);
  });

  it('should create', () => {
    const filter: HrzoneFilter = new HrzoneFilter([true, false, true, true, true], 'hrzone');
    filter.setUserZoneBoundaries([120, 130, 150, 166]);
    expect(filter == null).toBeFalsy();
  });

  it('should filter based on initial values', () => {
    const filter: HrzoneFilter = new HrzoneFilter([true, true, false, true, true], 'hrzone');
    filter.setUserZoneBoundaries([120, 130, 140, 166]);
    const result: number[] = filter.findRemainingIndices(activity);
    AbstractActivityFilter.filterAllValuesByIndex(activity, result);
    // [120, 121, 125, 140, 135, 137, 145, 150, 160, 161, 156, 135, 171, 155];
    // expect activities hr list not to contain values >= 130 and < 140
    expect(activity.getValues().getHrList().filter(x => !isNaN(x)))
      .toEqual(actClone.getValues().getHrList().filter(x => x < 130 || x >= 140));

    // expect result set to have correctly removed indices 4,5 and 11
    expect(result).toEqual([0, 1, 2, 3, 6, 7, 8, 9, 10, 12, 13]);
  });


  it('should reset to initial unfiltered state after clear is called', () => {
    const actClone2 = _.cloneDeep(activity);
    const filter: HrzoneFilter = new HrzoneFilter([true, true, false, true, true], 'hrzone');
    filter.setUserZoneBoundaries([120, 130, 140, 166]);
     filter.findRemainingIndices(activity);
    filter.clear();
    // console.log('activity = ' + activity.getValues().getHrList());
    const result: number[] = filter.findRemainingIndices(actClone2);
    expect(filter.initialZones).toEqual([true, true, true, true, true]);
    // console.log(result + ' vs ' + actClone.getValues().getHrList());
    expect(result.length).toEqual(actClone.getValues().getHrList().length);

  });

  it('should still filter correctly after being rehydrated', () => {
    const filter: HrzoneFilter = new HrzoneFilter([true, true, false, true, true], 'hrzone');
    filter.setUserZoneBoundaries([120, 130, 140, 166]);
    const obj: Object = <Object>filter;
    let newFilter = new HrzoneFilter();
    newFilter = newFilter.reHydrate(obj);
    AbstractActivityFilter.filterAllValuesByIndex(activity, newFilter.findRemainingIndices(activity));
    expect(activity.getValues().getHrList().filter(x => !isNaN(x)))
      .toEqual(actClone.getValues().getHrList().filter(x => x < 130 || x >= 140));
  });
});
