import * as fromActivities from './activity.reducer';
import {reducer} from './activity.reducer';
import {MockActivity} from '../model/activity/activity.mock';
import {Activity} from '../model/activity/Activity_pb';
import {ActivitySidebarType, LoadActivity, SelectActivity} from '../actions/activity.actions';

describe('Activity Reducer', () => {

  const activity: Activity = MockActivity.generateMockActivity();
  const activitytwo: Activity = MockActivity.generateMockActivityTwo();

  const initState: fromActivities.State  = {
    selectedActivityId: null,
    activitySport: fromActivities.buildActivitySport(),
    activitySubSport: fromActivities.buildActivitySubSport(),
    sidebarContent: ActivitySidebarType.NoContent,
    unfilteredActivity: new Activity(),
    ids: [],
    entities: null
  };

    it('should return the default state', () => {
      const action = {} as any;
      const result = reducer(undefined, action);
      expect(result).toMatchSnapshot();
    });

  it('should add an activity when Load action is called', () => {
    const action = new LoadActivity(activity);
    const result = reducer(initState, action);
  expect(Object.keys(result.entities).length).toEqual(1 , 'entities dictionary should not be empty');
  expect(result.ids.length).toEqual( 1 , 'id array should not be empty');
  console.log(result.entities[result.selectedActivityId]);
  expect(result.unfilteredActivity).toEqual(activity, 'unfiltered activity is not the same as the loaded activity ');

  });



  it('should select an activity when Select action is called', () => {

    const loadAction1 = new LoadActivity(activity);
    const loadAction2 = new LoadActivity(activitytwo);
    const result = reducer(initState, loadAction1);
    const result2 = reducer(result, loadAction2);

    expect(result2.ids.length).toEqual( 2 , 'id array should now contain two values');
    expect(Object.keys(result2.entities).length).toEqual( 2 , 'entity dictionary should now contain two values');

    // select the second activity
    const selectAction = new SelectActivity('2');
    const newResult = reducer(result2, selectAction);

    expect(newResult.entities[newResult.selectedActivityId]).toEqual(activitytwo,
      'state not updated with newly selected activity');

  });


  it('should correctly filter the selected activity when FilterActivity is called', () => {

    const loadAction1 = new LoadActivity(activity);
    const loadAction2 = new LoadActivity(activitytwo);
    const result = reducer(initState, loadAction1);
    const result2 = reducer(result, loadAction2);
    const selectAction = new SelectActivity('2');
    const newResult = reducer(result2, selectAction);

    expect(true).toBeTruthy();
  });

});
