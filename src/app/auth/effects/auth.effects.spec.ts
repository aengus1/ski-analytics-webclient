import {inject, TestBed} from '@angular/core/testing';

import {AuthEffects} from './auth.effects';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthEffects]
    });
  });

  it('should be created', inject([AuthEffects], (service: AuthEffects) => {
    expect(service).toBeTruthy();
  }));
});
