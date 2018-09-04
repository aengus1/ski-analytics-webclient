// Caution -> this component isn't tested, or currently used in the application
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {MessageEvent} from '../../../shared/utils';
import {D3, D3Service, Selection} from 'd3-ng2-service';
import {ScaleLinear} from 'd3-scale';
import {BaseType} from 'd3-selection';


@Component({
  selector: 'app-d3-range-slider',
  template: `<span class="badge badge-light pull-right">{{value | number: '1.1-1' }} {{unitLabel}}</span><svg></svg>`,
  styleUrls: ['./d3-range-slider.component.css'],
  encapsulation: ViewEncapsulation.None,      // this forces angular to respect css class names on d3 elements
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class D3RangeSliderComponent implements OnInit {

  protected d3: D3;
  protected parentNativeElement: any;
  svg: Selection<BaseType, {}, SVGSVGElement, any>;
  created: Boolean = false;
  height = 50;
  margin_left = 10;
  margin_right = 10;
  minHandle;
  value = 0;
  xScale: ScaleLinear<number, number>;
  slider: Selection<BaseType, {}, SVGSVGElement, any>;

  @Input()
  width = 100;
  @Input()
  minimum = 0;
  @Input()
  maximum = 40;
  @Input()
  unitLabel: string;
  @Output()
  changeEvent = new EventEmitter<MessageEvent<number>>();

  constructor(element: ElementRef, d3Service: D3Service, private cd: ChangeDetectorRef) {
    this.parentNativeElement = element.nativeElement;
    this.d3 = d3Service.getD3(); // <-- obtain the d3 object from the D3 Service
  }

  ngOnInit() {
    const c = this;
    this.svg =  this.d3.select(this.parentNativeElement).select<SVGSVGElement>('svg');
    this.xScale = this.d3.scaleLinear()
      .domain([0, this.maximum])
      .range([0, this.width - this.margin_right - this.margin_left])
      .clamp(true);


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
        // .on('start.interrupt', function() { c.slider.interrupt(); })

      .on('start drag', function() {
        if (c.d3.event.x >= 0 && c.d3.event.x <= c.xScale(c.width - c.margin_left - c.margin_right) + 1 ) {
          c.minHandle.attr('cx', c.d3.event.x);
          c.value = c.xScale.invert(c.d3.event.x);
          c.changeEvent.emit( new MessageEvent<number>('value', c.xScale.invert(c.d3.event.x)));
          c.cd.detectChanges();
        }
        }));
    this.slider.insert('g', '.track-overlay')
      .attr('class', 'ticks')
      .attr('transform', 'translate(0,' + 18 +  ')')
      .selectAll('text')
      .data(this.xScale.ticks(5))
      .enter().append('text')
      .attr('x', this.xScale)
      .attr('text-anchor', 'middle')
      .text(function(d) { return d + ''; });

    this.minHandle = this.slider.insert('circle', '.track-overlay')
      .attr('class', 'handle')
      .attr('r', 7)
      .attr('cx', c.xScale(0));
    this.created = true;
  }
}
