import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  AuthActionTypes,
  Confirm,
  ConfirmFailure,
  ConfirmSuccess,
  ForgotPassword,
  ForgotPasswordFailure,
  ForgotPasswordSuccess,
  Login,
  LoginFailure,
  LoginSuccess,
  ResendConfirmCodeFailure,
  ResendConfirmCodeSuccess,
  ResetPassword,
  ResetPasswordFailure,
  ResetPasswordSuccess,
  Signup,
  SignupFailure,
  SignupSuccess
} from '../actions/auth.actions';

import {Authenticate, ConfirmUser, ResetPasswordUser, SignupUser} from '../model/user';
import {catchError, exhaustMap, map, tap} from 'rxjs/internal/operators';
import {of} from 'rxjs/index';
import {AuthService} from '../services/auth.service';
import {UserService} from '../services/user.service';

import {Router} from '@angular/router';

@Injectable()
export class AuthEffects {

  @Effect()
  login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.Login),
    map(action => action.payload),
    exhaustMap((auth: Authenticate) =>
      this.authService.signIn(auth.username, auth.password).pipe(
        map(user => {
          sessionStorage.setItem('userId', JSON.stringify(user));
          this.userService.getUserSettings();
        return new LoginSuccess({user});
        }),
        catchError(error => of(new LoginFailure(error)))
      )
    )
  );

  // NO -> the event is already being dispatched in the auth service
  // @Effect()
  // logout$ = this.actions$.pipe(
  //   ofType<Logout>(AuthActionTypes.Logout),
  //   tap(() =>
  //     this.authService.signOut()
  //   )
  // );

  @Effect()
  signup$ = this.actions$.pipe(
    ofType<Signup>(AuthActionTypes.Signup),
    map(action => action.payload),
    exhaustMap((userSignup: SignupUser) =>
      this.authService.signUp(userSignup.username, userSignup.password, userSignup.firstName, userSignup.lastName).pipe(
        map(user => new SignupSuccess({user})),
        catchError(error => of(new SignupFailure(error)))
      )
    )
  );

  @Effect()
  confirmSignup$ = this.actions$.pipe(
    ofType<Confirm>(AuthActionTypes.Confirm),
    map(action => action.payload),
    exhaustMap((confirmUser: ConfirmUser) =>
      this.authService.confirmSignUp(confirmUser.username, confirmUser.confirmCode).pipe(
        map(() => new ConfirmSuccess(confirmUser)),
        catchError(error => of(new ConfirmFailure(error)))
      )
    )
  );

  @Effect()
  resendConfirm$ = this.actions$.pipe(
    ofType<Confirm>(AuthActionTypes.ResendConfirmCode),
    map(action => action.payload),
    exhaustMap((signupUser: SignupUser) =>
      this.authService.resendConfirmCode(signupUser.username).pipe(
        map(user => new ResendConfirmCodeSuccess(user)),
        catchError(error => of(new ResendConfirmCodeFailure(error)))
      )
    )
  );

  @Effect()
  forgotPassword$ = this.actions$.pipe(
    ofType<ForgotPassword>(AuthActionTypes.ForgotPassword),
    map(action => action.payload),
    exhaustMap((username: any) =>
      this.authService.forgotPassword(username.username).pipe(
        map(confirmCode => new ForgotPasswordSuccess(confirmCode)),
        catchError(error => of(new ForgotPasswordFailure(error)))
      )
    )
  );

  @Effect()
  resetPassword$ = this.actions$.pipe(
    ofType<ResetPassword>(AuthActionTypes.ResetPassword),
    map(action => action.resetUser),
    exhaustMap((resetUser: ResetPasswordUser) =>
      this.authService.resetPassword(resetUser.username, resetUser.confirmCode, resetUser.password).pipe(
        map(user => new ResetPasswordSuccess(user)),
        catchError(error => of(new ResetPasswordFailure(error)))
      )
    )
  );

  @Effect({dispatch: false})
  forgotSuccess$ = this.actions$.pipe(
    ofType<ForgotPasswordSuccess>(AuthActionTypes.ForgotPasswordSuccess),
    tap(() => {
      this.router.navigate(['/reset']);
    })
  );

  @Effect({dispatch: false})
  resetSuccess = this.actions$.pipe(
    ofType<ForgotPasswordSuccess>(AuthActionTypes.ResetPasswordSuccess),
    tap(() => {
      this.router.navigate(['/signin']);
    })
  );

  @Effect({dispatch: false})
  loginSuccess$ = this.actions$.pipe(
    ofType<LoginSuccess>(AuthActionTypes.LoginSuccess),
    tap(() => {
      // sessionStorage.setItem('username', user.payload.user.username);
      // sessionStorage.setItem('sessiontoken', user.payload.user.signInUserSession.accessToken.jwtToken);
      this.router.navigate(['/']);
    })
  );

  @Effect({dispatch: false})
  loginRedirect$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginRedirect, AuthActionTypes.Logout),
    tap(() => {
      // this.authService.signOut();
      if ( this.router.url !== '/signout') {
        this.router.navigate(['/signin']);
      }
    })
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}
}
