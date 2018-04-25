import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Component, ViewEncapsulation} from '@angular/core';
import { D3BoxplotComponent } from './d3-boxplot.component';
import {D3Service} from 'd3-ng2-service';
import {D3ChartComponent} from '../d3-chart/d3chart.component';
import {ChartModule} from '../../chart.module';
import {forEach} from '@angular/router/src/utils/collection';
import {LoggerService} from '../../../shared/services/logger.service';
import {ConsoleLoggerService} from '../../../shared/services/console-logger.service';



  let fixture: ComponentFixture<AppMockComponent>;
  let component: AppMockComponent;
  let compiled: HTMLElement | null;

  @Component({
    selector: 'app-mock-component',
    template: `<app-d3-boxplot
  [width]=layout.width
  [height]=layout.height
  [data] = layout.data>
    </app-d3-boxplot>`,
    encapsulation: ViewEncapsulation.None
  })
  class AppMockComponent {

    public layout = {
      width: 400,
      height: 400,
      data: [1, 2, 3, 4, 5, 5, 5, 6, 7, 8, 9, 10],
    };


    constructor() {

    }

  }

describe('D3BoxplotComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ChartModule],
      declarations: [AppMockComponent ],
      providers: [D3Service, { provide: LoggerService, useClass: ConsoleLoggerService }]

    });
    fixture = TestBed.createComponent(AppMockComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    compiled = fixture.debugElement.nativeElement;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppMockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have exactly one "svg" with dimensions 400x400`, () => {
    let nativeEls: NodeListOf<SVGSVGElement> | undefined[];
    nativeEls = compiled ? compiled.querySelectorAll('svg') : [];
    expect(nativeEls.length).toBe(1, 'Incorrect number of elements found');
    if (nativeEls.length === 1) {
      const nativeEl = nativeEls[0];
      expect(nativeEl.attributes.getNamedItem('width').value).toBe('400', 'Incorrect width');
      expect(nativeEl.attributes.getNamedItem('height').value).toBe('400', 'Incorrect width');
      // expect(nativeEl.height.baseVal).toBe(400, 'Incorrect height');
    }
  });

  it('should have two whiskers at 1 and 10', () => {
    let nativeElss: NodeListOf<Element> | undefined[];
    nativeElss = compiled ? compiled.querySelectorAll('line.whisker') : [];
    expect(nativeElss.length).toBe(2, 'Incorrect number of whisker elements found');
    expect(nativeElss[0].attributes.getNamedItem('y1').value).toBe('360', 'whisker displayed at incorrect y position');
    expect(nativeElss[0].attributes.getNamedItem('y2').value).toBe('360', 'whisker is not a horizontal line');

    expect(nativeElss[1].attributes.getNamedItem('y1').value).toBe('0', 'whisker displayed at incorrect y position');
    expect(nativeElss[1].attributes.getNamedItem('y2').value).toBe('0', 'whisker is not a horizontal line');
      });
  //
  it('should have a box from 4 to 7', () => {
    let nativeElss: NodeListOf<Element> | undefined[];
    nativeElss = compiled ? compiled.querySelectorAll('rect.box') : [];
    expect(nativeElss.length).toBe(1, 'Incorrect number of box elements found');
    expect(Math.floor(parseInt(nativeElss[0].attributes.getNamedItem('y').value, 10 )))
      .toBe(110, 'whisker displayed at incorrect y position');
    expect(Math.floor(parseInt(nativeElss[0].attributes.getNamedItem('height').value, 10 )))
      .toBe(140, 'whisker is not a horizontal line');
  });
});
