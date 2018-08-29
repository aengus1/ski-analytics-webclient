import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {environment} from '../../../environments/environment';
import Amplify, {Auth} from 'aws-amplify';
import {fromPromise} from 'rxjs/internal/observable/fromPromise';
import {map} from 'rxjs/operators/map';
import {of} from 'rxjs/internal/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import * as fromAuth from '../reducers';
import {Logout} from '../actions/auth.actions';

@Injectable()
export class AuthService {

  // public loggedIn: BehaviorSubject<boolean>;

  constructor( private router: Router, private store: Store<fromAuth.State>) {
    Amplify.configure(environment.amplify);
    // this.loggedIn = new BehaviorSubject<boolean>(false);
  }

  public signUp(email, password, firstName, lastName): Observable<any> {
    return fromPromise(
      Auth.signUp(
      {username: email, password: password, attributes: { name: firstName, 'custom:familyName': lastName}}
      ));
  }

  public confirmSignUp(email, code): Observable<any> {
    return fromPromise(Auth.confirmSignUp(email, code));
  }

  public resendConfirmCode(email): Observable<any> {
    return fromPromise(Auth.resendSignUp(email));
  }

  public signIn(username: string, password): Observable<any> {
    return fromPromise(Auth.signIn(username, password));
      // .pipe(
      //   tap(() => this.store.dispatch(new Login({username, password})))
      // );
  }

  public forgotPassword(username: string): Observable<any> {
    return fromPromise(Auth.forgotPassword(username));
  }

  public resetPassword(username: string, code: string, password: string): Observable<any> {
    return fromPromise(Auth.forgotPasswordSubmit(username, code, password));
  }

  public isAuthenticated(): Observable<boolean> {
     return fromPromise(Auth.currentAuthenticatedUser())
      .pipe(
        map(result => {
          return true;
        }),
      catchError(error => {
        console.error('auth result = ' + error);
        return of(false);
      })
      );
  }


  public signOut() {
    fromPromise(Auth.signOut())
      .subscribe(
        result => {
          this.store.dispatch(new Logout());
          //  TODO -> store logged in state
          // this.loggedIn.next(false);
          // this.router.navigate(['/signin']);
        },
        error => console.log(error)
      );
  }
}
