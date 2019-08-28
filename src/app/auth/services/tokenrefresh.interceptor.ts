import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {catchError, filter, switchMap, take} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromAuth from '../reducers';

@Injectable()
export class TokenRefreshInterceptor implements HttpInterceptor {
  private refreshTokenInProgress = false;
  // Refresh Token Subject tracks the current token, or is null if no token is currently
  // available (e.g. refresh pending).
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  private publicUrls = ['signin', 'forgot', 'signup', 'reset', 'signout' ];

  constructor(public auth: AuthService, private router: Router, private store: Store<fromAuth.State>) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(catchError(err => {


        // if error comes from cognito-idp request we don't want to add an auth token
        if (this.publicUrls.includes(request.url) || request.url.includes('cognito-idp')) {
          console.log('intercepted cognito-idp request');
          // todo -> was it the call to refreshtoken itself? examine http post body here
          // if error comes specifically from refresh token call then logout
          // if (request.body.includes('refreshtoken')) {
          //   this.store.dispatch(new LoginRedirect());
          //   console.log(err);
          // }

          // error from non-refreshtoken cognito request -> throw
          return throwError(err);
        }

        // errors other than 401 -> throw
        if (err.status !== 401) {
          return throwError(err);
        }

        if (this.refreshTokenInProgress) {
          // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value
          // – which means the new token is ready and we can retry the request again
          return this.refreshTokenSubject.pipe(
            filter(result => result !== null),
            take(1),
            switchMap(() => next.handle(this.addAuthenticationToken(request)))
          );
        } else {
          console.log('refreshing token from interceptor');
          this.refreshTokenInProgress = true;

          // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
          this.refreshTokenSubject.next(null);

          // Call auth.refreshAccessToken(this is an Observable that will be returned)
          return this.auth.refreshTokenAsObservable().pipe(
            switchMap((token: string) => {
              // When the call to refreshToken completes we reset the refreshTokenInProgress to false
              // for the next time the token needs to be refreshed
              this.refreshTokenInProgress = false;
              this.refreshTokenSubject.next(token);

              return next.handle(this.addAuthenticationToken(request));
            }));
        }
      }));

  }


  addAuthenticationToken(request) {
    // Get access token from Local Storage
    const accessToken = this.auth.getTokenFromSessionStorage();

    // If access token is null this means that user is not logged in
    // And we return the original request
    if (!accessToken) {
      return request;
    }

    // We clone the request, because the original request is immutable
    return request.clone({
      setHeaders: {
        Authorization: this.auth.getTokenFromSessionStorage()
      }
    });
  }
}
