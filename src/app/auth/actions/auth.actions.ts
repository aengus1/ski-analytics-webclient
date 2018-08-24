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
  ConfirmFailure = '[Auth] ConfirmFailure',
  ResendConfirmCode = '[Auth] Resend Confirm code',
  ResendConfirmCodeSuccess = '[Auth] Resend Confirm Success',
  ResendConfirmCodeFailure = '[Auth] Resend Confirm Failure',
  ForgotPassword = '[Auth] Forgot Password',
  ForgotPasswordSuccess = '[Auth] Forgot Password Success',
  ForgotPasswordFailure= '[Auth] Forgot Password Failure'
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
export class ResendConfirmCode implements Action {
  readonly type = AuthActionTypes.ResendConfirmCode;

  constructor(public payload: SignupUser) {}
}

export class ResendConfirmCodeFailure implements Action {
  readonly type = AuthActionTypes.ResendConfirmCodeFailure;

  constructor(public payload: any) {}
}
export class ResendConfirmCodeSuccess implements Action {
  readonly type = AuthActionTypes.ResendConfirmCodeSuccess;

  constructor(public payload: any) {}
}

export class ForgotPassword implements Action {
  readonly type = AuthActionTypes.ForgotPassword;

  constructor(public payload: string) {}
}

export class ForgotPasswordSuccess implements Action {
  readonly type = AuthActionTypes.ForgotPasswordSuccess;

  constructor(public payload: { confirmCode: string }) {}
}

export class ForgotPasswordFailure implements Action {
  readonly type = AuthActionTypes.ForgotPasswordFailure;

  constructor(public payload: any) {
  }
}





export enum SignupStatus  { NOT_STARTED , SIGNUP_PENDING , SIGNUP_COMPLETE,
CONFIRM_PENDING, CONFIRM_COMPLETE, RESEND_CONFIRM_FAILED }
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
  | ConfirmFailure
  | ResendConfirmCode
  | ResendConfirmCodeFailure
  | ResendConfirmCodeSuccess
  | ForgotPassword
  | ForgotPasswordFailure
  | ForgotPasswordSuccess
  ;
