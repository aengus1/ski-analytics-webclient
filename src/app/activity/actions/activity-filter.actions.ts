import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import {ActivityFilter, ActivityFilterType} from '../model/activity-filter.model';

export enum ActivityFilterActionTypes {
  AddActivityFilter = '[ActivityFilter] Add ActivityFilter',
  UpdateActivityFilter = '[ActivityFilter] Update ActivityFilter',
  DeleteActivityFilter = '[ActivityFilter] Delete ActivityFilter',
  ClearActivityFilters = '[ActivityFilter] Clear ActivityFilters',
  ClearActivityFilter = '[ActivityFilter] Clear ActivityFilter'
}


export class AddActivityFilter implements Action {
  readonly type = ActivityFilterActionTypes.AddActivityFilter;

  constructor(public payload: { activityFilter: ActivityFilter }) {}
}

export class UpdateActivityFilter implements Action {
  readonly type = ActivityFilterActionTypes.UpdateActivityFilter;

  constructor(public payload: { activityFilter: Update<ActivityFilter> }) {}
}

export class DeleteActivityFilter implements Action {
  readonly type = ActivityFilterActionTypes.DeleteActivityFilter;

  constructor(public payload: { id: string }) {}
}

export class ClearActivityFilters implements Action {
  readonly type = ActivityFilterActionTypes.ClearActivityFilters;
}

export class ClearActivityFilter implements Action {
  readonly type = ActivityFilterActionTypes.ClearActivityFilter;
  constructor(public payload: { type: ActivityFilterType }) {}
}

export type ActivityFilterActions =
  AddActivityFilter
 | UpdateActivityFilter
 | DeleteActivityFilter
 | ClearActivityFilters
 | ClearActivityFilter;



