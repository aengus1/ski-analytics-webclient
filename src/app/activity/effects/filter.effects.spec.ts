import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable} from 'rxjs';

import {FilterEffects} from './filter.effects';

describe('FilterService', () => {
  let actions$: Observable<any>;
  let effects: FilterEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FilterEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(FilterEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
