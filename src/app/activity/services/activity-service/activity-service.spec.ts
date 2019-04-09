import {getTestBed, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {ActivityService} from './activity.service';
import {Activity} from '../../model/activity/Activity_pb';
import {environment} from '../../../../environments/environment';

describe('ActivityService', () => {
  let injector: TestBed;
  let service: ActivityService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ActivityService]
    });
    injector = getTestBed();
    service = injector.get(ActivityService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });


  describe('#getActivity', () => {
    it('should return an Observable<Activity>', () => {
      const dummyActivity: Activity = new Activity();
      dummyActivity.setId('123');

      service.getActivity('123').subscribe(activity => {
        expect(activity.getId).toBe('`123');
        expect(activity).toEqual(dummyActivity);
      });

      const req = httpMock.expectOne(`${environment.api}activity/123.pbf`);
      expect(req.request.method).toBe('GET');
      // expect(req.request.headers.get('content-type')).toBe('application/pbf')
      const array = dummyActivity.serializeBinary();
      // convert UInt8Array to arraybuffer)
      const resp = array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset);
      req.flush(resp);
    });
  });

  // describe('#importActivity', () => {
  //   it('should return an Observable<Object>', () => {
  //     const dummyResponse: Object = {'activityId' : 123};
  //
  //     const f: File = new File(['testfilecontents'], 'test.fit', {type: 'application/fit'});
  //     const fileList: Array<File> = [f];
  //
  //     service.importActivity(fileList).subscribe(res => {
  //       expect(res).toBe({'activityId': '123'});
  //     });
  //
  //     const req = httpMock.expectOne(`${environment.api}activity/`);
  //     expect(req.request.method).toBe('PUT');
  //     expect(req.request.headers.get('Content-Type')).toBe('application/fit');
  //     // expect(req.request.headers.get('content-type')).toBe('application/pbf')
  //     req.flush(dummyResponse);
  //   });
  // });

});
