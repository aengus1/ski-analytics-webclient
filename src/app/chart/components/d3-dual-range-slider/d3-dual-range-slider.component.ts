import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {ScaleLinear} from 'd3-scale';
import {D3, D3Service, Selection} from 'd3-ng2-service';
import {BaseType} from 'd3-selection';
import {MessageEvent} from '../../../shared/utils';


@Component({
  selector: 'app-d3-dual-range-slider',
  template: `<span class="badge badge-light pull-right">{{minValue | number: '1.1-1' }} -
     {{maxValue | number: '1.1-1'}} {{unitLabel}}</span>
  <svg width="100" height="60">
    <svg:g #slider id="slider" [attr.transform]="'translate(' + this.margin_left + ',' + this.height / 2 + ')'">
    <svg:line   class="track" [attr.x1]="scale().range()[0]" [attr.x2]="scale().range()[1]" />
    <svg:line   class="track track-inset" [attr.x1]="scale().range()[0]" [attr.x2]="scale().range()[1]" />
      <svg:g id="ticks" class="ticks" [attr.transform]="'translate(0,18)'" />
      <svg:circle id="minHandle" class="handle" [attr.cx]="0" [attr.r]="7" />
      <svg:circle id="maxHandle" class="handle"[attr.cx]="this.xScale(this.maximum)" [attr.r]="7" />
    <svg:line  #trackoverlay id="trackoverlay" class="track track-overlay" [attr.x1]="scale().range()[0]" [attr.x2]="scale().range()[1]" />
    </svg:g>
  </svg>`,
   // encapsulation: ViewEncapsulation.None,      // this forces angular to respect css class names on d3 elements
  styleUrls: ['./d3-dual-range-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class D3DualRangeSliderComponent implements OnInit, AfterViewInit {
  protected d3: D3;
  protected parentNativeElement: any;
  svg: Selection<BaseType, {}, SVGSVGElement, any>;
  initialized = false;
  height = 50;
  margin_left = 10;
  margin_right = 10;
  minValue = 0;
  maxValue = 0;
  minHandle;
  maxHandle;
  xScale: ScaleLinear<number, number>;
  @ViewChild('trackoverlay') track;

  @Input()
  width = 100;
  @Input()
  minimum = 0;
  @Input()
  maximum;
  @Input()
  unitLabel = '';
  @Input()
  reset = false;
  @Output()
  changeEvent = new EventEmitter<MessageEvent<number>>();

  constructor(element: ElementRef, d3Service: D3Service, private cd: ChangeDetectorRef) {
    this.parentNativeElement = element.nativeElement;
    this.d3 = d3Service.getD3(); // <-- obtain the d3 object from the D3 Service
  }

  scale() {
    return this.d3.scaleLinear()
      .domain([0, this.maximum])
      .range([0, this.width - this.margin_right - this.margin_left])
      .clamp(true);
  }

  dragHandler() {
    const c = this;
    {
      // check that mouse event is within slider range
      if (c.d3.event.x < 0 || c.d3.event.x > c.xScale(c.width - c.margin_left - c.margin_right) + 1) {
        return;
      }
      // find the slider closest to the mouse event
      const minDiff = Math.abs(c.d3.event.x - +this.minHandle.attr('cx'));
      const maxDiff = Math.abs(c.d3.event.x - +this.maxHandle.attr('cx'));

      // move the slider closest to the mouse event and emit event
      if (minDiff < maxDiff) {
        this.minHandle.attr('cx', c.d3.event.x);
        c.minValue = c.xScale.invert(c.d3.event.x);
        c.changeEvent.emit( new MessageEvent<number>('minValue', c.xScale.invert(c.d3.event.x)));
      } else {
        this.maxHandle.attr('cx', c.d3.event.x);
        c.maxValue = c.xScale.invert(c.d3.event.x);
        c.changeEvent.emit( new MessageEvent<number>('maxValue', c.xScale.invert(c.d3.event.x)));
      }
      c.cd.detectChanges();
    }
  }

  ngOnInit() {
    this.svg = this.d3.select(this.parentNativeElement).select<SVGSVGElement>('svg');
    this.minHandle = this.svg.select<SVGCircleElement>('#minHandle');
    this.maxHandle = this.svg.select<SVGCircleElement>('#maxHandle');
    this.xScale = this.scale();
    this.maxValue = this.maximum;
  }

  ngAfterViewInit() {
    const c = this;
    const sel = this.svg.select<any>('#trackoverlay');
    const slider = this.svg.select<SVGCircleElement>('#slider');

    sel.call(this.d3.drag()
       .on('start.interrupt', () => { slider.interrupt(); })
      .on('start drag', () => {
      // check that mouse event is within slider range
      if (c.d3.event.x < 0 || c.d3.event.x > c.xScale(c.width - c.margin_left - c.margin_right) + 1) {
        return;
      }
      // find the slider closest to the mouse event
      const minDiff = Math.abs(c.d3.event.x - +this.minHandle.attr('cx'));
      const maxDiff = Math.abs(c.d3.event.x - +this.maxHandle.attr('cx'));

      // move the slider closest to the mouse event and emit event
      if (minDiff < maxDiff) {
        this.minHandle.attr('cx', c.d3.event.x);
        c.minValue = c.xScale.invert(c.d3.event.x);
        c.changeEvent.emit( new MessageEvent<number>('minValue', c.xScale.invert(c.d3.event.x)));
      } else {
        this.maxHandle.attr('cx', c.d3.event.x);
        c.maxValue = c.xScale.invert(c.d3.event.x);
        c.changeEvent.emit( new MessageEvent<number>('maxValue', c.xScale.invert(c.d3.event.x)));
      }
      c.cd.detectChanges();
    }));

    const ticks = this.svg.select<SVGLineElement>('#ticks');
    ticks.selectAll('text')
      .data(this.xScale.ticks(4).concat(this.xScale.domain()))
      .enter().append('text')
      .attr('x', this.xScale)
      .attr('text-anchor', 'middle')
      .text( (d) => d.toFixed(0) + '');
    this.initialized = true;
  }



  /**
   * reset sliders to initial values
   */
  clear() {
    this.svg.select<SVGCircleElement>('#minHandle').attr('cx', this.minimum);
    this.minValue = this.xScale.invert(this.minimum);
    this.svg.select<SVGCircleElement>('#maxHandle').attr('cx', this.xScale(this.width - this.margin_left - this.margin_right) + 1);
    this.maxValue =  this.xScale.invert(this.width - this.margin_left - this.margin_right);
    this.cd.detectChanges();
    this.reset = false;
  }

  set(min: number, max: number) {
    this.svg.select<SVGCircleElement>('#minHandle').attr('cx', this.xScale(min));
    this.svg.select<SVGCircleElement>('#maxHandle').attr('cx', this.xScale(max));
    this.minValue = min;
    this.maxValue = max;
  }

}
