import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromAuth from '../reducers';
import {SignupUser} from '../model/user';
import {Confirm, ResendConfirmCode, Signup} from '../actions/auth.actions';

@Component({
  selector: 'app-signup-page',
  template: `
    <app-signup-form
    (submittedSignup)="onSubmitSignup($event)"
    [signupStatus]= "signupStatus$ | async"
    [signupErrorMessage]="errorSignup$ | async"
    (submittedConfirm)="onSubmitConfirm($event)"
    (submittedResendConfirm)="onResendConfirm($event)"
    [confirmErrorMessage]="errorConfirm$ | async"
    [resendConfirmErrorMessage]="resendConfirm$ | async"
    >
  </app-signup-form>
  `
})
export class SignupPageComponent implements OnInit {
  signupStatus$ = this.store.pipe(select(fromAuth.getSignupPageStatus));
  errorSignup$ = this.store.pipe(select(fromAuth.getSignupPageSignupError));
  errorConfirm$ = this.store.pipe(select(fromAuth.getSignupPageConfirmError));
  resendConfirm$ = this.store.pipe(select(fromAuth.getSignupPageResendConfirmError));

  constructor(private store: Store<fromAuth.State>) {}

  ngOnInit() {}

  onSubmitSignup($event: SignupUser) {
    this.store.dispatch(new Signup($event));
  }

  onSubmitConfirm($event: any) {
    this.store.dispatch(new Confirm($event));
  }

  onResendConfirm($event: any) {
    this.store.dispatch(new ResendConfirmCode($event));
  }
}
