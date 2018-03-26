import { Action } from '@ngrx/store';
import {Activity} from '../model/Activity_pb';


export enum ActivityActionTypes {
  Select= '[Activity] Select Activity',
  Load= '[Activity] Load Activity',
  SetSidebarContent = '[Activity] Set Sidebar Content'

}

export class SelectActivity implements Action {

  readonly type = ActivityActionTypes.Select;
  constructor(public payload: number) {}
}

export class LoadActivity implements Action {

  readonly type = ActivityActionTypes.Load;
  constructor(public payload: Activity) {}
}

export class SetSidebarContent implements Action {
  readonly type = ActivityActionTypes.SetSidebarContent;
  constructor(public payload: ActivitySidebarType) {}
}



export enum ActivitySidebarType  { NoContent, Filter, Attribute }
export type ActivityActions = SelectActivity | LoadActivity | SetSidebarContent;
