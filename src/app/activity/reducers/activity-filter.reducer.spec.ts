import { reducer, initialState } from './activity-filter.reducer';
import * as fromActivities from './activity.reducer';
import {ActivitySidebarType} from '../actions/activity.actions';
import * as fromFilters from './activity-filter.reducer';
import {
  AddActivityFilter,
  DeleteActivityFilter,
  UpdateActivityFilter
} from '../actions/activity-filter.actions';
import { MockActivityFilter } from '../model/activity-filter/activity-filter.mock';
import {SpeedFilter} from '../components/filter-speed/speed-filter';

const initState: fromFilters.State  = {
  ids: [],
  entities: null,
  error: null
};


describe('ActivityFilter Reducer', () => {

    it('should return the initial state', () => {
      const action = {} as any;
      const result = reducer(initState, action);
      expect(result).toBe(initState);
    });

    it( 'should add a new activity filter', () => {
      const action = new AddActivityFilter({'activityFilter': MockActivityFilter.generateMockSpeedFilter(),
        'allFilters': {}});
      const result = reducer(initState, action);

      expect(result.entities['speed']).toEqual(MockActivityFilter.generateMockSpeedFilter());
    });

  it( 'should update an activity filter', () => {
    // add a filter
    const filter = MockActivityFilter.generateMockSpeedFilter();
    const action = new AddActivityFilter({'activityFilter': filter, 'allFilters': {}});
    const result = reducer(initState, action);

    // change the filter and dispatch an update event
    filter._min = 5;
    filter._max = 15;
    const updateAction = new UpdateActivityFilter({'activityFilter': {id: filter.id, changes: filter}, 'allFilters': result.entities });
    const updatedState = reducer(result, updateAction);
    const speedFilter: SpeedFilter = <SpeedFilter> updatedState.entities['speed'];

    expect(speedFilter._min).toEqual(5);
    expect(speedFilter._max).toEqual(15);
  });


  it( 'should delete an activity filter', () => {
    // add a filter
    const filter = MockActivityFilter.generateMockSpeedFilter();
    const action = new AddActivityFilter({'activityFilter': filter, 'allFilters': {}});
    const result = reducer(initState, action);

    // change the filter and dispatch an update event
    filter._min = 5;
    filter._max = 15;
    const deleteAction = new DeleteActivityFilter({'id': filter.id , 'allFilters': result.entities });
    const updatedState = reducer(result, deleteAction);

    expect(Object.keys(updatedState.entities).length).toEqual(0);
    expect(updatedState.ids.length).toEqual(0);
  });

  // it( 'should clear an activity filter', () => {
  //   // add a filter
  //   const filter = MockActivityFilter.generateMockSpeedFilter();
  //   filter._min = 5;
  //   filter._max = 15;
  //   const action = new AddActivityFilter({'activityFilter': filter, 'allFilters': {}});
  //   const result = reducer(initState, action);
  //
  //   // change the filter and dispatch an update event
  //   filter._min = 5;
  //   filter._max = 15;
  //   const clearAction = new ClearActivityFilter({'activityFilter': {id: filter.id, changes: filter}, 'allFilters': result.entities });
  //   const updatedState = reducer(result, clearAction);
  //
  //   const sf: SpeedFilter = <SpeedFilter>updatedState.entities['speed'];
  //   expect(sf._min).toEqual(sf.initialMin);
  //   expect(sf._max).toEqual(sf.initialMax);
  // });




});
