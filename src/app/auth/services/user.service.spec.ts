import {TestBed} from '@angular/core/testing';

import {UserService} from './user.service';
import {Apollo} from 'apollo-angular';

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [Apollo]
  }));

  it('should be created', () => {
    const service: UserService = TestBed.inject(UserService);
    expect(service).toBeTruthy();
  });
});
