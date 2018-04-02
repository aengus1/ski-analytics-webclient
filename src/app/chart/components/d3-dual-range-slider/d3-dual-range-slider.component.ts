import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input, OnChanges,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {ScaleLinear} from 'd3-scale';
import {D3, D3Service, Selection} from 'd3-ng2-service';
import {BaseType} from 'd3-selection';
import {MessageEvent} from '../../../shared/utils';

@Component({
  selector: 'app-d3-dual-range-slider',
  template: `<span class="badge badge-light pull-right">{{minValue | number: '1.1-1' }} -
     {{maxValue | number: '1.1-1'}} {{unitLabel}}</span>
  <svg></svg>`,
  encapsulation: ViewEncapsulation.None,      // this forces angular to respect css class names on d3 elements
  styleUrls: ['./d3-dual-range-slider.component.css']
})
export class D3DualRangeSliderComponent implements OnInit, OnChanges {
  protected d3: D3;
  protected parentNativeElement: any;
  svg: Selection<BaseType, {}, SVGSVGElement, any>;
  created: Boolean = false;
  height = 50;
  margin_left = 10;
  margin_right = 10;
  minHandle;
  maxHandle;
  minValue = 0;
  maxValue = 0;
  xScale: ScaleLinear<number, number>;
  slider: Selection<BaseType, {}, SVGSVGElement, any>;

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

  ngOnInit() {
    const c = this;
    this.svg = this.d3.select(this.parentNativeElement).select<SVGSVGElement>('svg');
    this.xScale = this.d3.scaleLinear()
      .domain([0, this.maximum])
      .range([0, this.width - this.margin_right - this.margin_left])
      .clamp(true);

    this.maxValue = this.maximum;
    this.slider = this.svg.append('g').attr('class', 'slider')
      .attr('transform', 'translate(' + this.margin_left + ',' + this.height / 2 + ')')
      .attr('id', 'slider');

    this.slider.append('line')
      .attr('class', 'track')
      .attr('x1', this.xScale.range()[0])
      .attr('x2', this.xScale.range()[1]);

    this.svg.select('g').append('line')
      .attr('class', 'track')
      .attr('class', 'track-inset')
      .attr('x1', this.xScale.range()[0])
      .attr('x2', this.xScale.range()[1]);

    this.svg.select('g').append('line')
      .attr('class', 'track')
      .attr('class', 'track-overlay')
      .attr('x1', this.xScale.range()[0])
      .attr('x2', this.xScale.range()[1])
      .call(this.d3.drag()
       .on('start.interrupt', function() { c.slider.interrupt(); })

        .on('start drag', function () {
          // check that mouse event is within slider range
          if (c.d3.event.x < 0 || c.d3.event.x > c.xScale(c.width - c.margin_left - c.margin_right) + 1) {
            return;
          }
          // find the slider closest to the mouse event
          const minDiff = Math.abs(c.d3.event.x - c.minHandle.attr('cx'));
          const maxDiff = Math.abs(c.d3.event.x - c.maxHandle.attr('cx'));

          // move the slider closest to the mouse event and emit event
          if (minDiff < maxDiff) {
            c.minHandle.attr('cx', c.d3.event.x);
            c.minValue = c.xScale.invert(c.d3.event.x);
            c.changeEvent.emit( new MessageEvent<number>('minValue', c.xScale.invert(c.d3.event.x)));
          } else {
            c.maxHandle.attr('cx', c.d3.event.x);
            c.maxValue = c.xScale.invert(c.d3.event.x);
            c.changeEvent.emit( new MessageEvent<number>('maxValue', c.xScale.invert(c.d3.event.x)));
          }
          c.cd.detectChanges();
        }));

    this.slider.insert('g', '.track-overlay')
      .attr('class', 'ticks')
      .attr('transform', 'translate(0,' + 18 + ')')
      .selectAll('text')
      .data(this.xScale.ticks(5))
      .enter().append('text')
      .attr('x', this.xScale)
      .attr('text-anchor', 'middle')
      .text(function (d) {
        return d + '';
      });

    this.minHandle = this.slider.insert('circle', '.track-overlay')
      .attr('class', 'handle')
      .attr('r', 7)
      .attr('cx', 0);

    this.maxHandle = this.slider.insert('circle', '.track-overlay')
      .attr('class', 'handle')
      .attr('r', 7)
      .attr('cx', c.xScale(c.maximum));
    this.created = true;
  }

  ngOnChanges() {
    if (this.reset) {
      this.clear();
    }
  }

  /**
   * reset sliders to initial values
   */
  clear() {
    this.minHandle.attr('cx', this.minimum);
    this.minValue = this.xScale.invert(this.minimum);
    console.log('min value = ' + this.minValue);
    this.changeEvent.emit( new MessageEvent<number>('minValue', this.xScale.invert(this.minimum)));

    this.maxHandle.attr('cx', this.xScale(this.width - this.margin_left - this.margin_right) + 1);
    this.maxValue =  this.xScale.invert(this.width - this.margin_left - this.margin_right);
    console.log('max value = ' + this.maxValue);
    this.changeEvent.emit( new MessageEvent<number>('maxValue', this.xScale.invert(this.maximum)));

    this.cd.detectChanges();
    this.reset = false;
  }
}
