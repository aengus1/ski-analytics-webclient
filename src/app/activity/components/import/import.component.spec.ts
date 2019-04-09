import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';

import {ImportComponent} from './import.component';
import {ImportDirective} from './import.directive';
import {NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ActivityService} from '../../services/activity-service/activity.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ImportComponent', () => {
  let component: ImportComponent;
  let fixture: ComponentFixture<ImportComponent>;
  let activityService: ActivityService;
  let activityServiceSpy;
  let injector;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgbModule.forRoot(), HttpClientTestingModule],
      declarations: [ImportComponent, ImportDirective],
      providers: [NgbModal, ActivityService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    injector = getTestBed();
    activityService = injector.get(ActivityService);
    activityServiceSpy = spyOn(activityService, 'importActivity');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should call importActivity on file change event', () => {
  //   const event: any = {
  //     target: {
  //       files: [
  //         new File(['testfilecontents'], './test.fit', {type: 'application/fit'})
  //       ]}};
  //
  //
  //   component.onFileChange(event);
  //
  //   expect(activityServiceSpy).toHaveBeenCalled();
  // });

});
