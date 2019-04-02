import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {environment} from '../../../environments/environment';
import Amplify, {Auth} from 'aws-amplify';
import {fromPromise} from 'rxjs/internal/observable/fromPromise';
import {map} from 'rxjs/operators/map';
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
    console.log('checking if authenticated...');
    return  fromPromise(Auth.currentSession()).pipe(
        map( x => {
        try {
          // console.log('is authenticated result ' + JSON.stringify(x));
          // console.log('fromCurrent ' + JSON.stringify(x.idToken.jwtToken));
          const user = JSON.parse(sessionStorage.getItem('userId'));
          if (user !== undefined
            && user.signInUserSession !== undefined
            && user.signInUserSession.idToken !== undefined
            && user.signInUserSession.idToken.jwtToken !== undefined) {
            // update the session token as amplify handles refresh automatically
            // this should keep session alive
            if (x.idToken !== undefined && x.idToken.jwtToken !== undefined ) {
              user.signInUserSession.idToken.jwtToken = x.idToken.jwtToken;
              sessionStorage.setItem('userId', JSON.stringify(user));
            }
            // console.log('fromSessionStore ' + user.signInUserSession.idToken.jwtToken);
          } else {
            // console.log('error reading from session store ');
            // console.log('session store userId: ' +  sessionStorage.getItem('userId'));
          }

          // var user = JSON.parse(sessionStorage.getItem('userId'));
          // if (x !== undefined && x !== null && x.idToken !== undefined
          //   && user.signInUserSession !== undefined) {
          //   user.signInUserSession.idToken.jwtToken = x.idToken.jwtToken;
          //   sessionStorage.setItem('userId', JSON.stringify(user));
          //   console.log(' setting token' + x.idToken.jwtToken);
          // //sessionStorage.setItem('userId', x.idToken.jwtToken);
          return true;
        // return false;
        } catch (e) {
          console.log('not authenticated' + e);
          return false;
        }
      }, e => {
          console.log(e);
        })
      );
      // return fromPromise(Auth.currentAuthenticatedUser())
      // .pipe(
      //   map(result => {
      //     return true;
      //   }),
      // catchError(error => {
      //   console.error('auth result = ' + error);
      //   return of(false);
      // })
      // );
  }

  public getToken(): string {
    let user: any = sessionStorage.getItem('userId');
    if (user != null ) {
      console.log('user = ' + user);
      user = JSON.parse(user);
      return user.signInUserSession.idToken.jwtToken;
    } else {
      // trigger recompile
      return null;
    }
  }


  public signOut() {
    fromPromise(Auth.signOut())
      .subscribe(
        result => {
          sessionStorage.removeItem('userId');
          this.store.dispatch(new Logout());
          //  TODO -> store logged in state
          // this.loggedIn.next(false);
          // this.router.navigate(['/signin']);
        },
        error => console.log(error)
      );
  }
}
