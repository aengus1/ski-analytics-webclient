import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MovingStopComponent} from './moving-stop.component';
import {EffectsModule} from '@ngrx/effects';
import {combineReducers, StoreModule} from '@ngrx/store';
import {ActivityModule} from '../../../activity.module';
import * as fromActivities from '../../../reducers';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivitySummaryService} from '../../../services/activity-summary-service/activity-summary.service';
import {MockActivity} from '../../../model/activity/activity.mock';
import {Component, OnInit} from '@angular/core';
import {LoggerService} from '../../../../shared/services/logger.service';
import {D3Service} from 'd3-ng2-service';
import {ConsoleLoggerService} from '../../../../shared/services/console-logger.service';

let fixture: ComponentFixture<AppMockComponent>;
let component: AppMockComponent;
let compiled: HTMLElement | null;

@Component({
  selector: 'app-mock-component',
  template: `<app-moving-stop [data]=layout.data [stopCount]=layout.stopCount>
  </app-moving-stop>`
})
class AppMockComponent  implements OnInit {

  public act =  MockActivity.generateMockActivity();
  public layout = {
    data: [this.act.getSummary().getTotalmoving(), this.act.getSummary().getTotalstopped()],
    stopCount: 4
  };

  constructor() {
  }

  ngOnInit() {
    // run summarize activity manually as component expects activity to be summarized
    ActivitySummaryService.summarizeActivity(this.act, null, null, null);
  }
}

describe('MovingStopComponent', () => {

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
});
