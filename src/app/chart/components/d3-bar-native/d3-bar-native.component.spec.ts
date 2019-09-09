import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {D3BarNativeComponent} from './d3-bar-native.component';
import {D3Service} from 'd3-ng2-service';
import {LoggerService} from '../../../shared/services/logger.service';
import {ChartModule} from '../../chart.module';
import {ConsoleLoggerService} from '../../../shared/services/console-logger.service';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ChartOptions} from '../../ChartOptions';
import {ActivityModule} from '../../../activity/activity.module';
import {combineReducers, StoreModule} from '@ngrx/store';
import * as fromActivities from '../../../activity/reducers';
import {EffectsModule} from '@ngrx/effects';
import {RouterTestingModule} from '@angular/router/testing';
import {IntervalPipe} from '../../../shared/pipes/interval.pipe';

describe('D3BarNativeComponent', () => {
  let component: AppMockComponent;
  let fixture: ComponentFixture<AppMockComponent>;
  let compiled: HTMLElement | null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ChartModule],
      declarations: [AppMockComponent ],
      providers: [D3Service,
        { provide: LoggerService, useClass: ConsoleLoggerService },
        IntervalPipe]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ActivityModule,
        StoreModule.forRoot({
          activities: combineReducers(fromActivities.reducers),
        }),
        EffectsModule.forRoot([]),
        RouterTestingModule
      ],
      declarations: [AppMockComponent]
    });

    fixture = TestBed.createComponent(AppMockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match snapshot', () => {
    fixture.detectChanges();

    // noinspection TypeScriptUnresolvedFunction
    (<any>expect(fixture)).toMatchSnapshot();
  });
});

@Component({
  selector: 'app-mock-component',
  template: `<app-d3-bar-native
  [width]=layout.width
  [height]=layout.height
  [data] = layout.data
  [margin] = layout.margin
  [yLabel] = layout.yLabel
  [xLabels] = layout.xLabels
  [chartOptions] = layout.chartOptions>
    </app-d3-bar-native>`,
  encapsulation: ViewEncapsulation.None
})
class AppMockComponent  implements OnInit {


  public layout = {
    data: [10, 20, 30, 0, 40],
    width: 50,
    margin: 15,
    height: 50,
    yLabel: 'YLabelTest',
    xLabels: ['1', '2', '3', '4', '5'],
    chartOptions: new ChartOptions()
  };

  constructor() {

  }

  ngOnInit() {
    // run summarize activity manually as component expects activity to be summarized
    // ActivitySummaryService.summarizeActivity(this.layout.activity, null);
  }
}
