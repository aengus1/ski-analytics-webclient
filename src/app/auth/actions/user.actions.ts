import {Action} from '@ngrx/store';
import {
  MutationAddUserArgs,
  MutationSaveGenderArgs,
  MutationSaveHeightArgs,
  MutationSaveHrZonesArgs,
  MutationSaveWeightArgs
} from '../../../generated/graphql';

export enum UserActionTypes {
  GetUser = '[User] Get User',
  AddUserSettings = '[User] Add User Settings',
  SaveUserHeight = '[User] Save User Height',
  SaveUserWeight = '[User] Save User Weight',
  SaveUserHrZones = '[User] Save User Hr Zones',
  SaveUserGender = '[User] Save User Gender',
}

export class GetUser implements Action {
  readonly type = UserActionTypes.GetUser;

  constructor(public payload: string) {}
}

export class AddUserSettings implements Action {
  readonly type = UserActionTypes.AddUserSettings;

  constructor(public payload: MutationAddUserArgs) {}
}

export class SaveUserHeight implements Action {
  readonly type = UserActionTypes.SaveUserHeight;

  constructor(public payload: MutationSaveHeightArgs) {
  }
}

export class SaveUserWeight implements Action {
  readonly type = UserActionTypes.SaveUserWeight;

  constructor(public payload: MutationSaveWeightArgs) {
  }
}

export class SaveUserHrZones implements Action {
  readonly type = UserActionTypes.SaveUserHrZones;

  constructor(public payload: MutationSaveHrZonesArgs) {
  }
}

export class SaveUserGender implements Action {
  readonly type = UserActionTypes.SaveUserGender;

  constructor(public payload: MutationSaveGenderArgs) {
  }
}

export type UserActions =
  | GetUser
  | AddUserSettings
  | SaveUserGender
  | SaveUserWeight
  | SaveUserHeight
  | SaveUserHrZones
  ;
