import {Action} from '@ngrx/store';
import {Activity} from '../model/activity/Activity_pb';
import {ActivityFilter} from '../model/activity-filter/activity-filter.model';
import {Dictionary, Update} from '@ngrx/entity';

export enum ActivityActionTypes {
  Select= '[Activity] Select Activity',
  Load= '[Activity] Load Activity',
  SetSidebarContent = '[Activity] Set Sidebar Content',
  FilterSelectedActivity = '[Activity] Filter Selected Activity'

}

export class SelectActivity implements Action {

  readonly type = ActivityActionTypes.Select;
  constructor(public payload: string) {}
}

export class LoadActivity implements Action {

  readonly type = ActivityActionTypes.Load;
  constructor(public payload: Activity) {}
}

export class SetSidebarContent implements Action {
  readonly type = ActivityActionTypes.SetSidebarContent;
  constructor(public payload: ActivitySidebarType) {}
}

export class FilterSelectedActivity implements Action {
  readonly type = ActivityActionTypes.FilterSelectedActivity;
  constructor(public activityFilter: Update<ActivityFilter>, public allFilters: Dictionary<ActivityFilter>) {}
}



export enum ActivitySidebarType  { NoContent, Filter, Attribute }
export type ActivityActions = SelectActivity | LoadActivity | SetSidebarContent | FilterSelectedActivity;
