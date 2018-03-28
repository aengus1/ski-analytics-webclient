import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ActivityFilter } from '../model/activity-filter.model';
import { ActivityFilterActions, ActivityFilterActionTypes } from '../actions/activity-filter.actions';
import {createSelector} from '@ngrx/store';
import {getActivityFiltersState} from './index';

export interface State extends EntityState<ActivityFilter> {
  // additional entities state properties
}

export const adapter: EntityAdapter<ActivityFilter> = createEntityAdapter<ActivityFilter>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state = initialState,
  action: ActivityFilterActions
): State {
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

    case ActivityFilterActionTypes.ClearActivityFilters: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export interface ActivityFiltersState {
  filters: State;
}

export const getActivityFiltersEntitiesState = createSelector(
  getActivityFiltersState,
  state => state.filters
);

export const {
  selectIds: getActivityFilterIds,
  selectEntities: getActivityFilterEntities,
  selectAll: getAllActivityFilters
} = adapter.getSelectors(getActivityFiltersEntitiesState);
