import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromAuth from './auth.reducer';
import * as fromLoginPage from './login-page.reducer';
import * as fromSignupPage from './signup-page.reducer';
import * as fromForgotPage from './forgot-page.reducer';
import * as fromRoot from '../../reducers';

export interface AuthState {
  status: fromAuth.State;
  loginPage: fromLoginPage.State;
  signupPage: fromSignupPage.State;
  forgotPage: fromForgotPage.State;
}

export interface State extends fromRoot.State {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AuthState> = {
  status: fromAuth.reducer,
  loginPage: fromLoginPage.reducer,
  signupPage: fromSignupPage.reducer,
  forgotPage: fromForgotPage.reducer
};

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthStatusState = createSelector(
  selectAuthState,
  (state: AuthState) => state.status
);
export const getLoggedIn = createSelector(
  selectAuthStatusState,
  fromAuth.getLoggedIn
);

export const getUser = createSelector(selectAuthStatusState, fromAuth.getUser);

export const selectLoginPageState = createSelector(
  selectAuthState,
  (state: AuthState) => state.loginPage
);
export const getLoginPageError = createSelector(
  selectLoginPageState,
  fromLoginPage.getError
);
export const getLoginPagePending = createSelector(
  selectLoginPageState,
  fromLoginPage.getPending
);

export const selectSignupPageState = createSelector(
  selectAuthState,
  (state: AuthState) => state.signupPage
);
export const getSignupPageSignupError = createSelector(
  selectSignupPageState,
  fromSignupPage.getSignupError
);
export const getSignupPageStatus = createSelector(
  selectSignupPageState,
  fromSignupPage.getSignupStatus
);

export const getSignupPageConfirmError = createSelector(
  selectSignupPageState,
  fromSignupPage.getConfirmError
);

export const getSignupPageResendConfirmError = createSelector(
  selectSignupPageState,
  fromSignupPage.getResendConfirmError
);

export const selectForgotPageState = createSelector(
  selectAuthState,
  (state: AuthState) => state.forgotPage
);
export const getForgotPageError = createSelector(
  selectForgotPageState,
  fromForgotPage.getError
);
export const getForgotPagePending = createSelector(
  selectLoginPageState,
  fromForgotPage.getPending
);

