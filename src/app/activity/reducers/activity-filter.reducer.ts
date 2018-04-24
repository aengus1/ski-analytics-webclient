import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ActivityFilter } from '../model/activity-filter/activity-filter.model';
import { ActivityFilterActions, ActivityFilterActionTypes } from '../actions/activity-filter.actions';
import {ActivityActions} from '../actions/activity.actions';


export interface State extends EntityState<ActivityFilter> {
  error: any;
  // additional entities state properties
}

export const adapter: EntityAdapter<ActivityFilter> = createEntityAdapter<ActivityFilter>({
  selectId: (filter: ActivityFilter) => filter.id
});

export const initialState: State = adapter.getInitialState({
  error: null
  // additional entity state properties
});



export function reducer(
  state = initialState,
  action: ActivityFilterActions | ActivityActions
): State {
  console.log('hit act filter reducer ' + action.type);
  switch (action.type) {
    case ActivityFilterActionTypes.AddActivityFilter: {
      console.log('add activityfilter with ' + JSON.stringify(action.payload.activityFilter));
      return adapter.addOne(action.payload.activityFilter, state);
    }

     case ActivityFilterActionTypes.ClearActivityFilter:
    case ActivityFilterActionTypes.UpdateActivityFilter: {
      console.log('updating filter with ' + JSON.stringify(action.payload.activityFilter));
      {
        const res = adapter.updateOne(action.payload.activityFilter, state);
        console.log('done updating');
        return res;
      }
    }

    case ActivityFilterActionTypes.DeleteActivityFilter: {
      return adapter.removeOne(action.payload.id, state);
    }
    case ActivityFilterActionTypes.ClearActivityFilters: {
      return adapter.removeAll(state);
    }
    default: {
      return state;
    }
  }
}

export const getAllActivityFilters = (state: State) => state.entities;



