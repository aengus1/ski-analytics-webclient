import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromAuth from '../reducers';
import {Authenticate} from '../model/user';
import {Login} from '../actions/auth.actions';

@Component({
  selector: 'app-login-page',
  template: `
    <app-login-form
    (submitted)="onSubmit($event)"
    [pending]="pending$ | async"
    [errorMessage]="error$ | async">
  </app-login-form>
  `
})
export class LoginPageComponent implements OnInit {
  pending$ = this.store.pipe(select(fromAuth.getLoginPagePending));
  error$ = this.store.pipe(select(fromAuth.getLoginPageError));

  constructor(private store: Store<fromAuth.State>) {}

  ngOnInit() {}

  onSubmit($event: Authenticate) {
    this.store.dispatch(new Login($event));
  }
}
