import {Action} from '@ngrx/store';
import {Dictionary, Update} from '@ngrx/entity';
import {ActivityFilter} from '../model/activity-filter/activity-filter.model';

export enum ActivityFilterActionTypes {
  AddActivityFilter = '[ActivityFilter] Add ActivityFilter',
  UpdateActivityFilter = '[ActivityFilter] Update ActivityFilter',
  DeleteActivityFilter = '[ActivityFilter] Delete ActivityFilter',
  FilterActivity = '[ActivityFilter] Filter Activity',
  FilterActivitySuccess = '[ActivityFilter] Filter Activity Success'
}


export class AddActivityFilter implements Action {
  readonly type = ActivityFilterActionTypes.AddActivityFilter;

  constructor(public payload: { activityFilter: ActivityFilter, allFilters: Dictionary<ActivityFilter>}) {}
}

export class UpdateActivityFilter implements Action {
  readonly type = ActivityFilterActionTypes.UpdateActivityFilter;

  constructor(public payload: { activityFilter: Update<ActivityFilter>, allFilters: Dictionary<ActivityFilter> }) {}
}

export class DeleteActivityFilter implements Action {
  readonly type = ActivityFilterActionTypes.DeleteActivityFilter;

  constructor(public payload: { id: string, allFilters: Dictionary<ActivityFilter> }) {}
}


export class FilterActivity implements Action {
  readonly type = ActivityFilterActionTypes.FilterActivity;
  constructor(public payload: { activityFilter: Update<ActivityFilter>, allFilters: Dictionary<ActivityFilter> }) {}
}

export class FilterActivitySuccess implements Action {
  readonly type = ActivityFilterActionTypes.FilterActivitySuccess;
  constructor() {}
}

export type ActivityFilterActions =
  AddActivityFilter
 | UpdateActivityFilter
 | DeleteActivityFilter
 | FilterActivity
| FilterActivitySuccess;



