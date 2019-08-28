import {TestBed} from '@angular/core/testing';

import {AlertService} from './alert.service';
import {SocketService} from './socket.service';
import {AuthService} from '../../auth/services/auth.service';
import {RouterTestingModule} from '@angular/router/testing';
import {combineReducers, Store, StoreModule} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromAuth from '../../auth/reducers';

describe('AlertService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]),
        StoreModule.forRoot({
          ...fromRoot.reducers,
          auth: combineReducers(fromAuth.reducers),
        })],
      providers: [SocketService, AuthService, RouterTestingModule, Store]
    }));


  it('should be created', () => {
    const service: AlertService = TestBed.get(AlertService);
    expect(service).toBeTruthy();
  });
});
