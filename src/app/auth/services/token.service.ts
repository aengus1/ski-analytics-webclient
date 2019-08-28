import {Injectable, Injector} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {LoginRedirect} from '../actions/auth.actions';
import * as fromAuth from '../reducers/';
import {Store} from '@ngrx/store';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private authService: AuthService;


  constructor(private injector: Injector) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService = this.injector.get(AuthService);
    if (!this.authService.isAuthenticated()) {
      console.log(' not authenticated');

      // refresh token and retry
      console.log('calling refresh token from interceptor');
      this.authService.refreshToken().then(x => {
        if (!this.authService.isAuthenticated()) {
          // TODO -> redirect to modal instead of signin page explaining that need to log in again
          this.authService.signOut();
        }
      });
      return;
    }
    console.log('requesting token....');
    return this.authService.getTokenAsObservable()
      .mergeMap((token: string) => {
        console.log('auth token request fulfilled : ' + token);
        request = request.clone({
          setHeaders: {
            'Authorization': token
          }
        });
        return next.handle(request);
      });
    //   this.authService.getToken().then( x => {
    //     console.log('got token returned');
    //     console.log('auth token request fulfilled : ' + x)
    //     request = request.clone({
    //       setHeaders: {
    //         'Authorization': x
    //       }
    //     });
    //     return next.handle(request);
    // });
    // console.log('AUTH INTERCEPTOR CALLED');
  }
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private store: Store<fromAuth.State>) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)
      .pipe(catchError(err => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          this.store.dispatch(new LoginRedirect());
          console.log(err);
        }
        return throwError(err);
      }));
  }
}


