import {Component, ElementRef, Input, ViewEncapsulation} from '@angular/core';
import {D3ChartComponent} from '../d3-chart/d3chart.component';
import {LoggerService} from '../../../shared/services/logger.service';
import {D3Service, Selection} from 'd3-ng2-service';
import {ChartOptions} from '../d3-bar/ChartOptions';
import {ScaleLinear} from 'd3-scale';
import {DataSeries} from './data-series.model';

@Component({
  selector: 'app-d3-line',
  template: `
    <svg></svg>`,
  styleUrls: ['./d3-line.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class D3LineComponent extends D3ChartComponent {

  @Input()
  private chartOptions: ChartOptions;

  @Input()
  private xAxisData: any[];
  @Input()
  private seriesData: number[][];  // data in base type represents the x axis data series.  seriesData represents all of the value series

  @Input()
  private seriesKey: DataSeries[];  // tuple: name, index of data series in 'seriesData', data type, color

  @Input()
  private xAxisFormat = 2; // 0 = time of day, 1 = seconds, 2 = hh:mm:ss

  private min: any;
  private max: any;
  private margin: any;
  protected logger: LoggerService;
  private axes: any[][] = [];
  private lAxis: any = null;
  private rAxis: any = null;
  private rAxisIdx = null;
  private lAxisIdx = null;
  private xSeries = null;
  private xScale = null;
  private xAxis = null;
  private g: Selection<any, SVGSVGElement, any, any>;

  constructor(element: ElementRef, d3Service: D3Service, logger: LoggerService) {
  super(element, d3Service, logger);
  this.logger = logger;
  }

  public createChart() {
    if (this.width > 0) {
      this.margin = {
        top: this.height * 0.1,
        right: this.width * 0.1,
        bottom: this.height * 0.2,
        left: this.width * 0.1
      };
    }
    this.min = Infinity;
    this.max = -Infinity;

    // set up the svg element and the chart
    if (this.parentNativeElement !== null) {
      this.d3Svg.attr('width', this.width);
      this.d3Svg.attr('height', this.height);
    }
  }

  public updateChart() {
    this.logger.info('[D3LineComponent] update chart triggered');
    // base
    if (!this.seriesData || !this.xAxisData) {
      this.logger.info('[D3LineComponent] no data');
      return;
    }
    this.xAxisData = this.xAxisData.filter(d => (d !== '-999' && d !== 'marker'));
    this.seriesData = this.seriesData.map(x => x.filter(d => (d !== -999 && !isNaN(d))));
    this.g = <any>this.d3Svg.selectAll('svg')
      .data([this.xAxisData])
      .enter()
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    this.build();

  }

  public setLeftAxis(index: number) {
    this.g.select('g.axis--y.axis-left').remove();
    this.g.select('text.axis--y.axis-left').remove();

    this.lAxis = this.g.append('g').classed('axis--y axis-left', true)
      .style('stroke', this.axes[index][0].color)
      .call(this.axes[index][2]);

    // axis ticks
    this.lAxis.selectAll('g').classed('tick', true)
      .attr('class', 'tick axis-left')
      .style('font-family', '"Helvetica Neue", Helvetica, Arial, sans-serif')
      .style('font-weight', 'normal')
      .style('font-size', 'normal')
      .style('stroke', this.axes[index][0].color)
      .select('line').attr('class', 'axis-left');

    this.lAxis.selectAll('g.tick.axis-left.text').style('stroke', 'black');
      // .select('text').style('stroke', 'black !important');

    // axis label
    this.g.append('text').classed('axis--y axis-left', true)
      .attr('transform', 'rotate(-90)')
      .attr('x', 0 - (this.height / 2.5))
      .attr('y', 0 - this.margin.left)
      .attr('dy', '1em')
      .style('font-family', '"Helvetica Neue", Helvetica, Arial, sans-serif')
      .style('font-weight', 'normal')
      .style('font-size', 'small')
      .style('text-anchor', 'middle')
      .text(this.axes[index][0].name);
  }

  public setRightAxis(index: number) {
    this.g.select('g.axis--y.axis-right').remove();
    this.g.select('text.axis--y.axis-right').remove();

    this.rAxis = this.g.append('g').classed('axis--y axis-right', true)
      .attr('transform', 'translate( ' + (this.width - this.margin.left - this.margin.right) + ', 0 )')
      .style('stroke', this.axes[index][0].color + ' !important;')
      .call(this.axes[index][3]);

    this.rAxis.selectAll('g').classed('tick', true)
      .attr('class', 'tick axis-right')
      .style('font-family', '"Helvetica Neue", Helvetica, Arial, sans-serif')
      .style('font-weight', 'normal')
      .style('font-size', 'normal')
      .style('stroke', this.axes[index][0].color)
      .select('line').attr('class', 'axis-right');

    this.g.append('text').classed('axis--y axis-right', true)
      .attr('transform', 'rotate(-90)')
      .attr('x', 0 - (this.height / 2.5))
      .attr('y', this.width - this.margin.left - this.margin.right + 25)
      .attr('dy', '1em')
      .style('font-family', '"Helvetica Neue", Helvetica, Arial, sans-serif')
      .style('font-weight', 'normal')
      .style('font-size', 'small')
      .style('text-anchor', 'middle')
      .text(this.axes[index][0].name);


  }

  protected build() {
    const svg = this.d3Svg.append('g').attr('transform', 'translate(' + this.margin.left + ', ' + this.margin.top + ')');
    const width = this.width - this.margin.left - this.margin.right;
    const height = this.height - this.margin.top - this.margin.bottom;
    const background = svg.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', width)
      .attr('height', height)
      .style('opacity', 0.5)
      .style('fill', '#d2f7ff');


    // set up the x axis
    switch (this.xAxisFormat) {
      case 0: { // in seconds
        this.xSeries = this.xAxisData.map(x => new Date(x).valueOf());
        this.xScale = this.d3.scaleTime().domain([this.xSeries[0], this.d3.max(this.xSeries)]).range([0, width]);
         this.xAxis = this.d3.axisBottom(this.xScale).tickSize(5);
        break;
      }
      case 1: { // in time of day
         this.xSeries = this.xAxisData.map(x => new Date(x).valueOf());
        const timeOffset: number = this.xSeries[0];
        const toSeconds = x => (x - timeOffset) / 1000;
         this.xSeries = this.xSeries.map(x => toSeconds(x));
        this.xScale = this.d3.scaleLinear()
          .domain([0, this.d3.max(<number[]>this.xSeries)])
          .range([0, width]);
        this.xAxis = this.d3.axisBottom(this.xScale).tickSize(0);
        break;
      }
      case 2: {  // in hh:mm:ss
         this.xSeries = this.xAxisData.map(x => new Date(x).valueOf()
          - (new Date(this.xAxisData[0]).valueOf() - this.d3.timeDay.round(new Date(this.xAxisData[0])).valueOf()));
        this.xScale = this.d3.scaleTime().domain([this.xSeries[0], this.d3.max(this.xSeries)]).range([0, width]).nice();
        this.xAxis = this.d3.axisBottom(this.xScale).tickSize(5).tickFormat(this.d3.timeFormat('%H:%M:%S'));
      }
    }

    // TODO //option 4 -> display distance

    const xAxisEl = svg.append('g').classed('axis--x', true)
      .attr('class', 'axis-bottom')
      .style('text-anchor', 'start')
      .attr('transform', 'translate(0,' + height + ')')
      .call(this.xAxis)
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-65)');

    /**
     * set up the y axes - create an array of axis
     * key:  -ve = currently visible axis, lower number is left axis.
     * number indicates index of data series it represents in seriesData array
     * value: [ ['name:string', 'index: number', format:YLabelFormat], [scale], [axisL], [axisR] (draw elements on demand)
     */
    this.seriesKey.forEach(series => {
      const scale = this.d3.scaleLinear().domain([0, this.d3.max(this.seriesData[series.index])]).range([height, 0]);
      const axisL = this.d3.axisLeft(scale).ticks(6).tickPadding(5);
      const axisR = this.d3.axisRight(scale).ticks(6).tickPadding(5);
      this.axes.push([series, scale, axisL, axisR]);
    });

    this.lAxisIdx = 0;
    this.rAxisIdx = 1;
    this.setLeftAxis(0);
    this.setRightAxis(1);


    /**
     * draw the enabled series'
     */
    this.seriesKey.forEach((x, i) => {
      if (! x.enabled) { // only draw enabled series
        return;
      }
      const scale: ScaleLinear<number, number> = this.axes[i][1];
      const dict = [];
      this.seriesData[x.index].forEach((v, idx) => {
        const seriesA = {};
        seriesA['x'] = this.xSeries[idx];
        seriesA['y'] = v;
        dict.push(seriesA);
      });

      const valueline = this.d3.line()
        .x((d) => this.xScale(d['x'])).y(d => scale(d['y']));
      let clicked = false;
      svg.append('path')
        .attr('class', 'line axis-series a' + i)
        .style('stroke', this.axes[i][0].color)
        .attr('d', valueline(dict))
        .on('mouseover', d => {
          this.d3.select(this.d3.event.target).style('stroke-width', 2);
          //TODO -> this isn't working
          if (this.lAxisIdx !== this.axes[x.index][0].index && this.rAxisIdx !== this.axes[x.index][0].index) {
            this.setRightAxis(x.index);
          }
        })
        .on('mouseout', d => {
          this.d3.select(this.d3.event.target).style('stroke-width', '1px');
          if (!clicked) {
            this.setRightAxis(this.rAxisIdx);
          }
          clicked = false;
        })
        .on('click', d => {
          this.d3.select(this.d3.event.target).style('stroke-width', '1px');
          this.rAxisIdx = x;
          this.setRightAxis(x.index);
          clicked = true;
        });
      //
    });
  }

}
