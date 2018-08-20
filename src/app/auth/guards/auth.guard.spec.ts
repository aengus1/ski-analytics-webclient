import {TestBed} from '@angular/core/testing';

import {AuthGuard} from './auth.guard';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import * as fromRoot from '../../reducers';
import * as fromAuth from '../reducers';
import {combineReducers, Store, StoreModule} from '@ngrx/store';
import {LoginSuccess} from '../actions/auth.actions';

import {cold} from 'jasmine-marbles';
import {RouterTestingModule} from '@angular/router/testing';
import {createSpyObj} from '../../../setup-jest';
import {AuthService} from '../services/auth.service';
import {LoginPageComponent} from '../containers/login-page.component';

describe('AuthGuardGuard', () => {

  let guard: AuthGuard;
  let store: Store<any>;
  let routeSnapshot: ActivatedRouteSnapshot;
  // let routerStateSnapshot: RouterStateSnapshot;
  const mockSnapshot: any = createSpyObj('RouterStateSnapshot', ['toString']);
  let fixture, component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginPageComponent
      ],
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          auth: combineReducers(fromAuth.reducers),
        }),
        RouterTestingModule.withRoutes([
          {path: 'signin', component: LoginPageComponent}
        ]),
      ],
      providers: [
        AuthGuard,
        {provide: RouterStateSnapshot, useValue: mockSnapshot},
        AuthService
        ]
    });
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
  routeSnapshot = new ActivatedRouteSnapshot();
  store = TestBed.get(Store);
  spyOn(store, 'dispatch').and.callThrough();
  guard = TestBed.get(AuthGuard);
  });

  it('should return false if the user state is not logged in', () => {
    const expected = cold('(a|)', { a: false });

    expect(guard.canActivate(routeSnapshot, mockSnapshot)).toBeObservable(expected);
  });

  it('should return true if the user state is logged in', () => {
    const user: any = {};
    const action = new LoginSuccess({ user });
    store.dispatch(action);

    const expected = cold('(a|)', { a: true });

    expect(guard.canActivate(routeSnapshot, mockSnapshot)).toBeObservable(expected);
  });
});
