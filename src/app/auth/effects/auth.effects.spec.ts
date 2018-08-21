import {inject, TestBed} from '@angular/core/testing';

import {AuthEffects} from './auth.effects';
import * as fromRoot from '../../reducers';
import {AuthService} from '../services/auth.service';
import {RouterTestingModule} from '@angular/router/testing';
import {combineReducers, StoreModule} from '@ngrx/store';
import * as fromAuth from '../reducers';
import {EffectsModule} from '@ngrx/effects';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          auth: combineReducers(fromAuth.reducers),
        }),
        EffectsModule.forRoot([AuthEffects]),
        RouterTestingModule.withRoutes([])
      ],
      providers: [AuthEffects, AuthService]
    });
  });

  it('should be created', inject([AuthEffects], (service: AuthEffects) => {
    expect(service).toBeTruthy();
  }));
});
