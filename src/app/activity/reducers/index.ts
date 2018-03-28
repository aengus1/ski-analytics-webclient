import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';

import * as fromActivities from './activities.reducer';
import * as fromFilters from './activity-filter.reducer';
import * as fromRoot from '../../reducers';
import * as fromLayout from '../../shared/layout/reducers/layout.reducer';
import {ActivityFiltersState} from './activity-filter.reducer';


export interface ActivitiesState {
  activities: fromActivities.State;
}



export interface State extends fromRoot.State {
  activities: ActivitiesState;
  filters: ActivityFiltersState;
}

export const reducers: ActionReducerMap<ActivitiesState> = {
  activities: fromActivities.reducer
};

export const filterReducers: ActionReducerMap<ActivityFiltersState> = {
  filters: fromFilters.reducer
};


/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
export const getActivitiesState = createFeatureSelector<ActivitiesState>('activities');

export const getActivityFiltersState = createFeatureSelector<ActivityFiltersState>('filters');

export const getLayoutState = createFeatureSelector<fromLayout.State>('layout');



/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them usable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */
export const getActivitiesEntitiesState = createSelector(
  getActivitiesState,
  state => state.activities);




export const getSelectedActivityId = createSelector(
  getActivitiesEntitiesState,
  fromActivities.getSelectedActivityId
);

export const getActivitySport = createSelector(
  getActivitiesEntitiesState,
  fromActivities.getActivitySport
);

export const getActivitySubSport = createSelector(
  getActivitiesEntitiesState,
  fromActivities.getActivitySubSport
);

export const getSidebarContent = createSelector(
  getActivitiesEntitiesState,
  fromActivities.getSidebarContents
);


/**
 * Adapters created with @ngrx/entity generate
 * commonly used selector functions including
 * getting all ids in the record set, a dictionary
 * of the records by id, an array of records and
 * the total number of records. This reduces boilerplate
 * in selecting records from the entity state.
 */
export const {
  selectIds: getActivityIds,
  selectEntities: getActivityEntities,
  selectAll: getAllActivities,
  selectTotal: getTotalActivities,
} = fromActivities.adapter.getSelectors(getActivitiesEntitiesState);




export const getSelectedActivity = createSelector(
  getActivityEntities,
  getSelectedActivityId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);



export const getShowSidebar = createSelector(
  getLayoutState,
  fromLayout.getShowSidebar
);



