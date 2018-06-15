import {MockActivity} from '../../model/activity/activity.mock';
import {Activity} from '../../model/activity/Activity_pb';
import * as _ from 'lodash';
import {AbstractActivityFilter} from './abstract-activity-filter';
import {ActivityFilter} from '../../model/activity-filter/activity-filter.model';

let activity: Activity;
let actClone: Activity;
 class TestFilter extends AbstractActivityFilter {

  applyFilter(act: Activity): number[] {
    return [0, 1, 2, 5, 9, 10, 11, 13];
  }

  clear(): void {
  }

  reHydrate(obj: Object): ActivityFilter {
    return this;
  }

  filterAll(act: Activity, indices: number[]) {
    super.filterAllValuesByIndex(act, indices);
  }

}

describe('Abstract Activity Filter', () => {
  beforeEach(() => {
    activity = MockActivity.generateMockActivity();
    actClone = _.cloneDeep(activity);
  });

  it('should filter number value array correctly', () => {
    const filter = new TestFilter();
    const res = filter.filterAll(activity, [0, 1, 2, 5, 9, 10, 11, 13]);
    const expectedRes = activity.getValues().getHrList();
    expectedRes[3] = NaN;
    expectedRes[6] = NaN;
    expectedRes[12] = NaN;
    expectedRes.splice(4, 1);
    expectedRes.splice(7, 1);
    expectedRes.splice(8, 1);
    expect(activity.getValues().getHrList()).toEqual(expectedRes);
  });

  it('should filter number string array correctly', () => {
    const filter = new TestFilter();
    const res = filter.filterAll(activity, [0, 1, 2, 5, 9, 10, 11, 13]);
    const expectedRes = activity.getValues().getTsList();
    expectedRes[3] = 'marker';
    expectedRes[6] = 'marker';
    expectedRes[12] = 'marker';
    expectedRes.splice(4, 1);
    expectedRes.splice(7, 1);
    expectedRes.splice(8, 1);
    expect(activity.getValues().getTsList()).toEqual(expectedRes);
  });
});
