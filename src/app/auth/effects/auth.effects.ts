import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  AuthActionTypes,
  Confirm,
  ConfirmFailure,
  ConfirmSuccess,
  Login,
  LoginFailure,
  LoginSuccess,
  Signup,
  SignupFailure,
  SignupSuccess,
} from '../actions/auth.actions';

import {Authenticate, ConfirmUser, SignupUser} from '../model/user';
import {catchError, exhaustMap, map, tap} from 'rxjs/internal/operators';
import {of} from 'rxjs/index';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Injectable()
export class AuthEffects {

  @Effect()
  login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.Login),
    map(action => action.payload),
    exhaustMap((auth: Authenticate) =>
      this.authService.signIn(auth.username, auth.password).pipe(
        map(user => new LoginSuccess({ user })),
        catchError(error => of(new LoginFailure(error)))
      )
    )
  );

  @Effect()
  signup$ = this.actions$.pipe(
    ofType<Signup>(AuthActionTypes.Signup),
    map(action => action.payload),
    exhaustMap((userSignup: SignupUser) =>
      this.authService.signUp(userSignup.username, userSignup.password, userSignup.firstName, userSignup.lastName).pipe(
        map(user => new SignupSuccess({ user })),
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
        map(user => new ConfirmSuccess(confirmUser)),
        catchError(error => of(new ConfirmFailure(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginSuccess),
    tap(() => this.router.navigate(['/']))
  );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginRedirect, AuthActionTypes.Logout),
    tap(authed => {
      this.router.navigate(['/signin']);
    })
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
