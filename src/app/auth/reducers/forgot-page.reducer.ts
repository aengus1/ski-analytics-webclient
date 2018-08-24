import {AuthActions, AuthActionTypes} from './../actions/auth.actions';

export interface State {
  error: string | null;
  pending: boolean;
}

export const initialState: State = {
  error: null,
  pending: false,
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.ForgotPassword: {
      return {
        ...state,
        error: null,
        pending: true,
      };
    }

    case AuthActionTypes.ForgotPasswordSuccess: {
      return {
        ...state,
        error: null,
        pending: false,
      };
    }

    case AuthActionTypes.ForgotPasswordFailure: {
      return {
        ...state,
        error: action.payload.message,
        pending: false,
      };
    }

    default: {
      return state;
    }
  }
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
