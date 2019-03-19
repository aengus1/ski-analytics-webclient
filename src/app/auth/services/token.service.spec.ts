import {inject, TestBed} from '@angular/core/testing';

import {TokenInterceptor} from './token.service';

describe('TokenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenInterceptor]
    });
  });

  it('should be created', inject([TokenInterceptor], (service: TokenInterceptor) => {
    expect(service).toBeTruthy();
  }));
});
