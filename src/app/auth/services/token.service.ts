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
    const token: string = this.authService.getToken();
    console.log('AUTH INTERCEPTOR CALLED');
    request = request.clone({
      setHeaders: {
        'Authorization': token
      }
    });
    return next.handle(request);
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
