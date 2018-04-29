import { reducer, initialState } from './activity-filter.reducer';
import * as fromActivities from './activity.reducer';
import {ActivitySidebarType} from '../actions/activity.actions';
import * as fromFilters from './activity-filter.reducer';
import {AddActivityFilter} from '../actions/activity-filter.actions';
import { MockActivityFilter } from '../model/activity-filter/activity-filter.mock';

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


});
