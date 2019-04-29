import {UserActions, UserActionTypes} from '../actions/user.actions';
import {User} from '../../../generated/graphql';

export interface State {
  userSettings: User | null;
}

export const initialState: State = {
  userSettings: null,
};

export function reducer(state = initialState, action: UserActions): State {
  switch (action.type) {
    case UserActionTypes.AddUserSettings: {
      return {
        ...state
      };
    }
    case UserActionTypes.GetUser: {
      return {
        ...state
      };
    }

    default: {
      return state;
    }
  }
}

export const getUserSettings = (state: State) => state.userSettings;
