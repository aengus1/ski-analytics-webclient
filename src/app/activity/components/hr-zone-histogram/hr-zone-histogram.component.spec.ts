import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HrZoneHistogramComponent} from './hr-zone-histogram.component';
import {ActivityModule} from '../../activity.module';
import {RouterTestingModule} from '@angular/router/testing';
import {EffectsModule} from '@ngrx/effects';
import {combineReducers, StoreModule} from '@ngrx/store';
import * as fromActivities from '../../reducers';
import {MockActivity} from '../../model/activity/activity.mock';
import {Component, OnInit} from '@angular/core';
import {D3Service} from 'd3-ng2-service';
import {LoggerService} from '../../../shared/services/logger.service';
import {ConsoleLoggerService} from '../../../shared/services/console-logger.service';

let fixture: ComponentFixture<AppMockComponent>;
let component: AppMockComponent;
let compiled: HTMLElement | null;

@Component({
  selector: 'app-mock-component',
  template: `<app-hr-zone-histogram [thresholds]="layout.thresholds" [distTime]="layout.distTime"
                                    [activity]="layout.activity" >
  </app-hr-zone-histogram>`
})
class AppMockComponent  implements OnInit {


  public layout = {
    activity: MockActivity.generateMockActivity(),
    thresholds: [120, 140, 160, 170],
    distTime: 1
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
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should calculate bins on init', () => {
    const comp = new HrZoneHistogramComponent();
    comp.activity = component.layout.activity;
    comp.thresholds = component.layout.thresholds;
    const spy = jest.spyOn(comp, 'calcData');
    comp.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });

  it('should correctly sum time in zone', () => {
    const comp = new HrZoneHistogramComponent();
    comp.activity = component.layout.activity;
    comp.thresholds = component.layout.thresholds;
    // const spy = jest.spyOn(comp, 'data');
    comp.ngOnInit();
    expect(comp.data()).toEqual([0, 5, 5, 2, 1]);
  });
});
