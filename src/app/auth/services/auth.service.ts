import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {environment} from '../../../environments/environment';
import Auth from '@aws-amplify/auth';
import Amplify from '@aws-amplify/core';
import {fromPromise} from 'rxjs/internal/observable/fromPromise';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromAuth from '../reducers';
import {Logout} from '../actions/auth.actions';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import {reject} from 'q';

@Injectable()
export class AuthService {

  // public loggedIn: BehaviorSubject<boolean>;

  constructor(private router: Router, private store: Store<fromAuth.State>) {
    Amplify.configure(environment.amplify);
    // this.loggedIn = new BehaviorSubject<boolean>(false);
  }

  public signUp(email, password, firstName, lastName): Observable<any> {
    return fromPromise(
      Auth.signUp(
        {username: email, password: password, attributes: {name: firstName, 'custom:familyName': lastName}}
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

  public async refreshToken(): Promise<string> {
    console.log('refreshing token');
    try {
      const cognitoUser = await Auth.currentAuthenticatedUser();
      const currentSession = await Auth.currentSession();
      return cognitoUser.refreshSession(currentSession.getRefreshToken(), (err, session) => {
        const {idToken, refreshToken, accessToken} = session;
        sessionStorage.setItem('userId', JSON.stringify(idToken.jwtToken));
        sessionStorage.setItem('tokenExp', JSON.stringify(idToken.payload.exp));
        console.log('returning token: ' + JSON.stringify(idToken.jwtToken));
        return JSON.stringify(idToken.jwtToken);
      });
    } catch (e) {
      console.log('Unable to refresh Token', e);
      reject('Unable to refresh token');
    }
  }

  public refreshTokenAsObservable(): Observable<string> {
    return Observable.fromPromise(this.refreshToken());
  }

  public isAuthenticated(): Observable<boolean> {
    return fromPromise(Auth.currentAuthenticatedUser()
      .then(() => {
        console.log('authenticated');
        return true;
      })
      .catch((e) => {
        console.log('not authenticated: ' + JSON.stringify(e));
        return false;
      }));
  }
    // console.log('checking if authenticated...');
    //
    // // const expiry: number = Number.parseInt(sessionStorage.getItem('tokenExp'), 10);
    // // const now = new Date();
    // // const nowSeconds = Math.round(now.getTime() / 1000);
    // // if (nowSeconds >= (expiry - 60)) {
    // //   console.log('expiry = ' + expiry);
    // //   console.log('nowsec = ' + nowSeconds);
    // //   // sessionStorage.setItem('userId', null);
    // //   console.log('token expiry');
    // //   this.refreshToken().then(x => {
    // //     return doAuthCheck();
    // //   });
    // // } else {
    //   return doAuthCheck();
    //
    // function doAuthCheck() {
    //   return fromPromise(Auth.currentSession().then(token => {
    //     console.log('auth check = true');
    //       return true;
    //     }, (e) => {
    //     console.log('auth check = false');
    //       console.log('error getting current session ' + JSON.stringify(e));
    //       //sessionStorage.removeItem('userId', null);
    //       //sessionStorage.setItem('tokenExp', null);
    //       return false;
    //     })
    //   );
    // }
    // }


  public getTokenAsObservable(): Observable<string> {
    return Observable.fromPromise(this.getToken());
  }

  // TODO -> think about how and when we fall into the 'else' refresh token workflow
  // what happens when callers realize the token has expired?
  // should I check the expiry time on the token?
  // is there another way to null out the userId session variable? ie. from callers?
  // what about just refreshing on a 'set timeout' so that it is always valid?
  /**
   * In most cases by the time getToken is called we will have already confirmed that the user is authenticated by
   * calling isAuthenticated()
   */
  public async getToken(): Promise<string> {
    let user: any = sessionStorage.getItem('userId');
    console.log('user from token = ' + JSON.parse(user));
    const expiry: number = Number.parseInt(sessionStorage.getItem('tokenExp'), 10);
    const now = new Date();
    const nowSeconds = Math.round(now.getTime() / 1000);
    console.log('expiry = ' + expiry);
    console.log('nowsec = ' + nowSeconds);
    console.log('user = ' + user);
    if (user != null && (nowSeconds <= (expiry - 60))) {
      // console.log('jwtToken = ' + user.signInUserSession.idToken.jwtToken);
      user = JSON.parse(user);
      console.log('returning: ' + user);
      return user; // .signInUserSession.idToken.jwtToken;
    } else {
      console.log('calling refresh token from gettoken');
      return this.refreshToken();
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

  public getTokenFromSessionStorage(): string {
    return sessionStorage.getItem('userId');
  }
}
