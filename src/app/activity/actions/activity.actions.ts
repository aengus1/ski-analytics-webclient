import { Action } from '@ngrx/store';
import {Activity} from '../model/Activity_pb';

export enum ActivityActionTypes {
  Select= '[Activity] Select Activity',
  Load= '[Activity] Load Activity',

}

export class SelectActivity implements Action {

  readonly type = ActivityActionTypes.Select;
  constructor(public payload: number) {}
}

export class LoadActivity implements Action {
  readonly type = ActivityActionTypes.Load;
  constructor(public payload: Activity) {}
}


export type ActivityActions = SelectActivity | LoadActivity ;
