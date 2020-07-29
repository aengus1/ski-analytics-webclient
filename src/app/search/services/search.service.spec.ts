import {getTestBed, TestBed} from '@angular/core/testing';

import { SearchService } from './search.service';
import {ActivityService} from '../../activity/services/activity-service/activity.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Apollo} from 'apollo-angular';


describe('SearchService', () => {
  let injector: TestBed;
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchService, Apollo]
    });
    injector = getTestBed();
    service = injector.get(SearchService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
