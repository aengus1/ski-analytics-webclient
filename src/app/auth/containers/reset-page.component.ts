import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ResetPasswordUser} from '../model/user';
import {ResetPassword} from '../actions/auth.actions';
import * as fromAuth from '../reducers';

@Component({
  selector: 'app-reset-page',
  template: `
    <app-reset-form
    (submitted)="onSubmitReset($event)"
    [resetErrorMessage]="errorReset$ | async"
    >
  </app-reset-form>
  `
})
export class ResetPageComponent implements OnInit {

  errorReset$ = this.store.pipe(select(fromAuth.getResetPageError));

  constructor(private store: Store<fromAuth.State>) {}

  ngOnInit() {}

  onSubmitReset($event: ResetPasswordUser) {
    this.store.dispatch(new ResetPassword($event));
  }

}
