import * as fromActivities from './activity.reducer';
import {reducer} from './activity.reducer';
import {MockActivity} from '../model/activity/activity.mock';
import {Activity} from '../model/activity/Activity_pb';
import {ActivitySidebarType, LoadActivity, SelectActivity} from '../actions/activity.actions';
import {MockActivityFilter} from '../model/activity-filter/activity-filter.mock';
import {AddActivityFilter, FilterActivity} from '../actions/activity-filter.actions';
import * as fromFilters from './activity-filter.reducer';

describe('Activity Reducer', () => {

  const activity: Activity = MockActivity.generateMockActivity();
  const activitytwo: Activity = MockActivity.generateMockActivityTwo();

  const initState: fromActivities.State = {
    selectedActivityId: null,
    activitySport: fromActivities.buildActivitySport(),
    activitySubSport: fromActivities.buildActivitySubSport(),
    sidebarContent: ActivitySidebarType.NoContent,
    unfilteredActivity: new Activity(),
    ids: [],
    entities: null,
    tsLookup: fromActivities.buildTsLookupMap(activity)
  };

  it('should return the default state', () => {
    const action = {} as any;
    const result = reducer(undefined, action);
    expect(result).toMatchSnapshot();
  });

  it('should add an activity when Load action is called', () => {
    const action = new LoadActivity(activity);
    const result = reducer(initState, action);
    expect(Object.keys(result.entities).length).toEqual(1, 'entities dictionary should not be empty');
    expect(result.ids.length).toEqual(1, 'id array should not be empty');
    console.log(result.entities[result.selectedActivityId]);
    expect(result.unfilteredActivity).toEqual(activity, 'unfiltered activity is not the same as the loaded activity ');

  });


  it('should select an activity when Select action is called', () => {

    const loadAction1 = new LoadActivity(activity);
    const loadAction2 = new LoadActivity(activitytwo);
    const result = reducer(initState, loadAction1);
    const result2 = reducer(result, loadAction2);

    expect(result2.ids.length).toEqual(2, 'id array should now contain two values');
    expect(Object.keys(result2.entities).length).toEqual(2, 'entity dictionary should now contain two values');

    // select the second activity
    const selectAction = new SelectActivity('2');
    const newResult = reducer(result2, selectAction);

    expect(newResult.entities[newResult.selectedActivityId]).toEqual(activitytwo,
      'state not updated with newly selected activity');

  });

});

describe('Activity Filter', () => {
  it('should revert to original state when a second filter is applied and then cleared', () => {
    const activity: Activity = MockActivity.generateMockActivity();
    let initState: fromActivities.State = {
      selectedActivityId: null,
      activitySport: fromActivities.buildActivitySport(),
      activitySubSport: fromActivities.buildActivitySubSport(),
      sidebarContent: ActivitySidebarType.NoContent,
      unfilteredActivity: new Activity(),
      ids: [],
      entities: null,
      tsLookup: fromActivities.buildTsLookupMap(activity)
    };

    // 1. load and select activity
    const action = new LoadActivity(activity);
    initState = reducer(initState, action);
    const selectAction = new SelectActivity('1');
    initState = reducer(initState, selectAction);
    expect(activity.getValues().getAltitudeList).not.toBe(null);

    // 2. add a speedFilter
    const initFilterState: fromFilters.State  = {
      ids: [],
      entities: null,
      error: null
    };
    const speedFilter = MockActivityFilter.generateMockSpeedFilter2();  // 3 to 6
    const addSpeedFilterAction = new AddActivityFilter({'activityFilter': speedFilter,
      'allFilters': {}});
    // [0, 0, 1, 1.2, 1.7, 1.9, 3.4, 5.7, 7.5, 4.2, 0, 3.3, 9.0, 7.0];
    // expect 6, 7, 9, 11 to remain

    fromFilters.reducer(initFilterState, addSpeedFilterAction);
    initState = reducer(initState, addSpeedFilterAction);
    expect(activity.getValues().getSpeedList()).toEqual([NaN, 3.4, 5.7, NaN, 4.2, NaN, 3.3, NaN]);
    expect(activity.getValues().getHrList()).toEqual([NaN, 145, 150, NaN, 161, NaN, 135, NaN]);

    // 3. add a hrzone filter

    const hrFilter = MockActivityFilter.generateMockHrZoneFilter();
    const addHrzoneFilterAction = new AddActivityFilter({'activityFilter': hrFilter,
      'allFilters': MockActivityFilter.generateMockFilterDictionary2()});
    fromFilters.reducer(initFilterState, addHrzoneFilterAction);
    initState = reducer(initState, addHrzoneFilterAction);

    // [120, 121, 125, 140, 135, 137, 145, 150, 160, 161, 156, 135, 171, 155];
    // user zones: [120, 140, 150, 170]
    // expect values: NaN, 140, NaN, 145, 150, 160, 161, 156, NaN, 171, 155
    // expect indices: 3, 6, 7, 8, 9, 10, 12, 13
    // intersection with speed indices: 6, 7, 9 or 145, 150, 161
    expect(activity.getValues().getHrList()).toEqual([NaN, 145, 150, NaN, 161, NaN ]);
    expect(activity.getValues().getSpeedList()).toEqual([NaN, 3.4, 5.7, NaN, 4.2, NaN]);

    // 4. clear hrFilter

    const allFilters =  {'speed': speedFilter, 'hr': hrFilter};
    hrFilter.clear();
    const filterActivityAction = new FilterActivity({activityFilter: {id: hrFilter.id, changes: hrFilter},
      allFilters: allFilters}); // calling filteractivity directly instead of mocking the effect
    initState = reducer(initState, filterActivityAction);
    expect(activity.getValues().getSpeedList()).toEqual([NaN, 3.4, 5.7, NaN, 4.2, NaN, 3.3, NaN]);
    expect(activity.getValues().getHrList()).toEqual([NaN, 145, 150, NaN, 161, NaN, 135, NaN]);
  });
});

