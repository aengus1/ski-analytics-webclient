import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HrZoneHistogramComponent} from './hr-zone-histogram.component';
import {ActivityModule} from '../../../activity.module';
import {RouterTestingModule} from '@angular/router/testing';
import {EffectsModule} from '@ngrx/effects';
import {combineReducers, Store, StoreModule} from '@ngrx/store';
import * as fromActivities from '../../../reducers/index';
import * as fromActivity from '../../../reducers/index';
import {MockActivity} from '../../../model/activity/activity.mock';
import {Component, OnInit} from '@angular/core';
import {D3Service} from 'd3-ng2-service';
import {LoggerService} from '../../../../shared/services/logger.service';
import {ConsoleLoggerService} from '../../../../shared/services/console-logger.service';

let fixture: ComponentFixture<AppMockComponent>;
let component: AppMockComponent;
let compiled: HTMLElement | null;
let store: Store<fromActivity.State>;

@Component({
  selector: 'app-mock-component',
  template: `<app-hr-zone-histogram [thresholds]="layout.thresholds" [distTime]="layout.distTime"
                                    [activity]="layout.activity" [tsList]="layout.activity.getValues().getTsList()" >
  </app-hr-zone-histogram>`
})
class AppMockComponent  implements OnInit {


  public layout = {
    activity: MockActivity.generateMockActivity(),
    thresholds: [120, 140, 160, 170],
    distTime: 1,
    tsList: []
  };

  constructor() {

  }

  ngOnInit() {
    // run summarize activity manually as component expects activity to be summarized
    // ActivitySummaryService.summarizeActivity(this.layout.activity, null);
  }
}

describe('HrZoneHistogramComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ActivityModule,
        StoreModule.forRoot({
          activities: combineReducers(fromActivities.reducers),
        }),
        EffectsModule.forRoot([]),
        RouterTestingModule
      ],
       declarations: [AppMockComponent],
      providers: [D3Service, { provide: LoggerService, useClass: ConsoleLoggerService }]
    });

    fixture = TestBed.createComponent(AppMockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    store =  <Store<fromActivity.State>>fixture.debugElement.injector.get(Store);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  // it('should calculate bins on init', () => {
  //   const summaryService  = new ActivitySummaryService();
  //   const comp = new HrZoneHistogramComponent(store, summaryService);
  //   comp.activity = component.layout.activity;
  //   comp.unfiltered
  //   comp.thresholds = component.layout.thresholds;
  //   const spy = jest.spyOn(comp, 'calcData');
  //   comp.ngOnInit();
  //
  //   expect(spy).toHaveBeenCalled();
  // });

});
