import { TestBed, inject } from '@angular/core/testing';

import { FilterService } from './filter.service';

describe('FilterServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilterService]
    });
  });

  it('should be created', inject([FilterService], (service: FilterService) => {
    expect(service).toBeTruthy();
  }));
});
