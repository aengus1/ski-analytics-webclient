import {SpeedFilter} from './speed-filter';
import {MockActivity} from '../../model/activity/activity.mock';
import {Activity} from '../../model/activity/Activity_pb';
import * as _ from 'lodash';
import {AbstractActivityFilter} from '../filter/abstract-activity-filter';

let activity: Activity;



describe('SpeedFilter', () => {

  beforeEach(() => {
    activity = MockActivity.generateMockActivity();
  });

  it('should create', () => {
    const filter: SpeedFilter = new SpeedFilter(1, 4, 'speed');
    expect(filter == null).toBeFalsy();
  });

  it('should filter based on initial values', () => {
    const actClone =  _.cloneDeep(activity);
    const filter: SpeedFilter = new SpeedFilter(1, 6, 'speed');
    const result: number[] = filter.findRemainingIndices(activity);
    AbstractActivityFilter.filterAllValuesByIndex(activity, result);

    expect(Math.min.apply(null, activity.getValues().getSpeedList().filter(x => !isNaN(x)))).toBeGreaterThanOrEqual(filter.initialMin);
    expect(Math.max.apply(null, activity.getValues().getSpeedList().filter(x => !isNaN(x)))).toBeLessThanOrEqual(filter.initialMax);

    for (let i = 0; i < result.length - 1; i++ ) {
    const res = actClone.getValues().getSpeedList()
      [result[i]] <= filter.initialMax || actClone.getValues().getSpeedList()[result[i]] >= filter.initialMin;
      expect(res).toBeTruthy();
    }

  });

  it('should filter based on updated values', () => {
    const actClone =  _.cloneDeep(activity);
    const filter: SpeedFilter = new SpeedFilter(1, 4, 'speed');
    const newMin = 2;
    const newMax = 6;
    filter._min = newMin;
    filter._max = newMax;
    const result =  filter.findRemainingIndices(activity);
    AbstractActivityFilter.filterAllValuesByIndex(activity, result);
    expect(Math.min.apply(null, activity.getValues().getSpeedList().filter(x => !isNaN(x)))).toBeGreaterThanOrEqual(newMin);
    expect(Math.max.apply(null, activity.getValues().getSpeedList().filter(x => !isNaN(x)))).toBeLessThanOrEqual(newMax);

    for (let i = 0; i < result.length - 1; i++ ) {
      const res = actClone.getValues().getSpeedList()
        [result[i]] <= filter.initialMax || actClone.getValues().getSpeedList()[result[i]] >= filter.initialMin;
      expect(res).toBeTruthy();
    }

  });

  it( 'should return original set when filter range is outside bounds of original set', () => {
    const actClone = _.cloneDeep(activity);
    const filter: SpeedFilter = new SpeedFilter(-1, 49, 'speed');
    // console.log('ff = ' + JSON.stringify(filter));
    filter.findRemainingIndices(activity);

    expect(activity.getValues().getSpeedList().filter(x => !isNaN(x))).toEqual(actClone.getValues().getSpeedList());
  });

  it( 'should reset to initial min max after clear is called', () => {
    const filter: SpeedFilter = new SpeedFilter(1, 4, 'speed');
    const newMin = 2;
    const newMax = 6;
    filter._min = newMin;
    filter._max = newMax;
    filter.clear();
    expect(filter._min).toEqual(filter.initialMin);
    expect(filter._max).toEqual(filter.initialMax);

  });

  it( 'should still filter correctly after being rehydrated', () => {
    const filter: SpeedFilter = new SpeedFilter(1, 4, 'speed');
    const obj: Object = <Object>filter;
    let newFilter = new SpeedFilter();
    newFilter = newFilter.reHydrate(obj);
    AbstractActivityFilter.filterAllValuesByIndex(activity, newFilter.findRemainingIndices(activity));
    expect(Math.min.apply(null, activity.getValues().getSpeedList().filter(x => !isNaN(x)))).toBeGreaterThanOrEqual(newFilter.initialMin);
    expect(Math.max.apply(null, activity.getValues().getSpeedList().filter(x => !isNaN(x)))).toBeLessThanOrEqual(newFilter.initialMax);

  });


});
