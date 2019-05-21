import {inject, TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {combineReducers, StoreModule} from '@ngrx/store';
import {RouterTestingModule} from '@angular/router/testing';
import * as fromRoot from '../../reducers';
import * as fromAuth from '../reducers';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from '../effects/auth.effects';
import {Apollo} from 'apollo-angular';

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
      providers: [
        AuthService,
        Apollo
      ]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
