import {Action} from '@ngrx/store';
import {Authenticate, ConfirmUser, SignupUser, User} from '../model/user';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  Logout = '[Auth] Logout',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
  LoginRedirect = '[Auth] Login Redirect',
  Signup = '[Auth] Signup',
  SignupSuccess  = '[Auth] Signup Success',
  SignupFailure = '[Auth] Signup Failure',
  Confirm = '[Auth] Confirm',
  ConfirmSuccess = '[Auth] ConfirmSuccess',
  ConfirmFailure = '[Auth] ConfirmFailure'
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;

  constructor(public payload: Authenticate) {}
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;

  constructor(public payload: { user: User }) {}
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LoginFailure;

  constructor(public payload: any) {
    console.log('login failure: ' + JSON.stringify(payload));
  }
}

export class LoginRedirect implements Action {
  readonly type = AuthActionTypes.LoginRedirect;
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export class Signup implements Action {
  readonly type = AuthActionTypes.Signup;

  constructor(public payload: SignupUser) {}
}

export class SignupSuccess implements Action {
  readonly type = AuthActionTypes.SignupSuccess;

  constructor(public payload: any) {}
}

export class SignupFailure implements Action {
  readonly type = AuthActionTypes.SignupFailure;

  constructor(public payload: any) {
    console.log('signup failure: ' + payload.message);
  }
}

export class Confirm implements Action {
  readonly type = AuthActionTypes.Confirm;

  constructor(public payload: ConfirmUser) {}
}

export class ConfirmSuccess implements Action {
  readonly type = AuthActionTypes.ConfirmSuccess;

  constructor(public payload: any) {}
}

export class ConfirmFailure implements Action {
  readonly type = AuthActionTypes.ConfirmFailure;

  constructor(public payload: any) {}
}

export enum SignupStatus  { NOT_STARTED , SIGNUP_PENDING , SIGNUP_COMPLETE, CONFIRM_PENDING, CONFIRM_COMPLETE}
export type AuthActions =
  | Login
  | LoginSuccess
  | LoginFailure
  | LoginRedirect
  | Logout
  | Signup
  | SignupSuccess
  | SignupFailure
  | Confirm
  | ConfirmSuccess
  | ConfirmFailure;
