import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {D3LineComponent} from './d3-line.component';
import {D3Service} from 'd3-ng2-service';
import {LoggerService} from '../../../shared/services/logger.service';
import {ConsoleLoggerService} from '../../../shared/services/console-logger.service';

describe('D3LineComponent', () => {
  let component: D3LineComponent;
  let fixture: ComponentFixture<D3LineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ D3LineComponent ],
       providers: [D3Service, { provide: LoggerService, useClass: ConsoleLoggerService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3LineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
