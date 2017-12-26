import { TestBed, inject } from '@angular/core/testing';

import { FetchActivityService } from './fetch-activity.service';

describe('FetchActivityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FetchActivityService]
    });
  });

  it('should be created', inject([FetchActivityService], (service: FetchActivityService) => {
    expect(service).toBeTruthy();
  }));
});
