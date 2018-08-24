import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/internal/operators';
import {AuthService} from '../services/auth.service';
import {Route} from '@angular/compiler/src/core';
import {Store} from '@ngrx/store';
import {LoginRedirect} from '../actions/auth.actions';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private auth: AuthService, private store: Store<any>) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('AUTH GUARD CALLED');
    return this.auth.isAuthenticated()
      .pipe(
        tap(loggedIn => {
          if (!loggedIn) {
            this.store.dispatch(new LoginRedirect());
            // this.router.navigate(['/signin']);
          }else {
            console.log('logged in - we good');
          }
        })
      );
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    console.log('--------CAN LOAD CALLED');
    return this.auth.isAuthenticated().pipe( tap( loggedIn => {
      if (!loggedIn) {
        this.store.dispatch(new LoginRedirect());
      }
    }));
  }
}
