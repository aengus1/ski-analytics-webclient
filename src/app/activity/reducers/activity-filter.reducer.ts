import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {ActivityFilter} from '../model/activity-filter/activity-filter.model';
import {ActivityFilterActions, ActivityFilterActionTypes} from '../actions/activity-filter.actions';
import {ActivityActions} from '../actions/activity.actions';

export interface State extends EntityState<ActivityFilter> {
  error: any;
}

export const adapter: EntityAdapter<ActivityFilter> = createEntityAdapter<ActivityFilter>({
  selectId: (filter: ActivityFilter) => filter.id
});

export const initialState: State = adapter.getInitialState({
  error: null
});



export function reducer(state = initialState, action: ActivityFilterActions | ActivityActions): State {

  switch (action.type) {
    case ActivityFilterActionTypes.AddActivityFilter: {
      return adapter.addOne(action.payload.activityFilter, state);
    }

    case ActivityFilterActionTypes.UpdateActivityFilter: {
        return adapter.updateOne(action.payload.activityFilter, state);
    }

    case ActivityFilterActionTypes.DeleteActivityFilter: {
      return adapter.removeOne(action.payload.id, state);
    }
    default: {
      return state;
    }
  }
}

 export const getAllActivityFilters = (state: State) => {
  return Object.values(state.entities);
 };



