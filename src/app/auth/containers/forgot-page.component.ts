import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromAuth from '../reducers';
import {ForgotPassword} from '../actions/auth.actions';

@Component({
  selector: 'app-forgot-page',
  template: `
    <app-forgot-form
    (submitted)="onSubmit($event)"
    [pending]="pending$ | async"
    [errorMessage]="error$ | async">
  </app-forgot-form>
  `
})
export class ForgotPageComponent implements OnInit {
  pending$ = this.store.pipe(select(fromAuth.getForgotPagePending));
  error$ = this.store.pipe(select(fromAuth.getForgotPageError));

  constructor(private store: Store<fromAuth.State>) {}

  ngOnInit() {}

  onSubmit($event: any) {
    this.store.dispatch(new ForgotPassword($event));
  }
}
