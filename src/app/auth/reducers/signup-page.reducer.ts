import {AuthActions, AuthActionTypes, SignupStatus} from '../actions/auth.actions';

export interface State {
  signupError: string | null;
  signupStatus: SignupStatus;
  confirmError: string | null;
}

export const initialState: State = {
  signupError: null,
  signupStatus: SignupStatus.NOT_STARTED,
  confirmError: null
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.Signup: {
      return {
        ...state,
        signupError: null,
        signupStatus: SignupStatus.SIGNUP_PENDING,
        confirmError: null
      };
    }

    case AuthActionTypes.SignupSuccess: {
      return {
        ...state,
        signupError: null,
        signupStatus: SignupStatus.SIGNUP_COMPLETE,
        confirmError: null
      };
    }

    case AuthActionTypes.SignupFailure: {
      console.log('action.payload.message=' + action.payload.message);
      return {
        ...state,
        signupError: action.payload.message,
        signupStatus: SignupStatus.NOT_STARTED,
        confirmError: null
      };
    }

    case AuthActionTypes.Confirm: {
      return {
        ...state,
        signupError: null,
        signupStatus: SignupStatus.CONFIRM_PENDING,
        confirmError: null
      };
    }

    case AuthActionTypes.ConfirmSuccess: {
      return {
        ...state,
        signupError: null,
        signupStatus: SignupStatus.CONFIRM_COMPLETE,
        confirmError: null
      };
    }
    case AuthActionTypes.ConfirmFailure: {
      return {
        ...state,
        signupError: null,
        signupStatus: SignupStatus.SIGNUP_COMPLETE,
        confirmError: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

export const getSignupError = (state: State) => state.signupError;
export const getSignupStatus = (state: State) => state.signupStatus;
export const getConfirmError = (state: State) => state.confirmError;

