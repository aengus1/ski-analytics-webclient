import {Component, ElementRef, Input, ViewEncapsulation} from '@angular/core';
import {D3ChartComponent} from '../d3-chart/d3chart.component';
import {LoggerService} from '../../../shared/services/logger.service';
import {D3Service, Selection} from 'd3-ng2-service';
import {ChartOptions, YLabelFormat} from '../d3-bar/ChartOptions';

@Component({
  selector: 'app-d3-line',
  template: `
    <svg></svg>`,
  styleUrls: ['./d3-line.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class D3LineComponent  extends D3ChartComponent {

  @Input()
  private chartOptions: ChartOptions;

  @Input()
  private xAxisData: any[];
  @Input()
  private seriesData: number[][];  // data in base type represents the x axis data series.  seriesData represents all of the value series

  @Input()
  private leftAxis: [string, number, YLabelFormat];  // tuple: name, index of data series in 'seriesData', data type

  @Input()
  private rightAxis: [string, number, YLabelFormat]; // as above

  private min: any;
  private max: any;
  private margin: any;
  protected logger: LoggerService;

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
const sel = this.d3Svg.selectAll('svg')
  .data([this.xAxisData])
  .enter()
  .append('g')
  .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

this.build(<any>sel);

}

protected build(g: Selection<any, SVGSVGElement, any, any>) {
  const svg = this.d3Svg.append('g').attr('transform', 'translate(' + this.margin.left + ', ' + this.margin.top + ')');
  const width = this.width - this.margin.left - this.margin.right;
  const height = this.height - this.margin.top - this.margin.bottom;

  let timeSeries = this.xAxisData.map( x => new Date(x).valueOf());
  const timeOffset: number = timeSeries[0];
  const toSeconds = x => (x - timeOffset) / 1000;
  timeSeries = timeSeries.map(x => toSeconds(x));
  const xScale = this.d3.scaleLinear().domain([0, this.d3.max( timeSeries)]).range([0, width]);

  const lAxisSeries: number = this.leftAxis['1'];
  const leftYScale = this.d3.scaleLinear().domain([0, this.d3.max(this.seriesData[lAxisSeries])]).range([height, 0]);
  const yAxisLeft =  this.d3.axisLeft(leftYScale).ticks(6).tickPadding(5);


  const rAxisSeries: number = this.rightAxis['1'];
  const rightYScale = this.d3.scaleLinear().domain([0, this.d3.max(this.seriesData[rAxisSeries])]).range([height, 0]);
  const yAxisRight = this.d3.axisRight(rightYScale).ticks(6).tickPadding(5);

  const xAxis = this.d3.axisBottom(xScale).tickSize(0);







  const xAxisEl = svg.append('g').classed('axis--x', true)
    .attr('class', 'axis-bottom')
    .style('text-anchor', 'start')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis);

  const leftYAxis = svg.append('g')
    .classed('axis--y axis-left', true)
    .call(yAxisLeft);
    leftYAxis.selectAll('g').classed('tick', true).attr('class', 'tick axis-left')
    .select('line').attr('class', 'axis-left');


 const rightYAxis = svg.append('g')
   .classed('axis--y axis-right', true)
   .attr('transform', 'translate( ' + width + ', 0 )')
   .call(yAxisRight);
  rightYAxis.selectAll('g').classed('tick', true).attr('class', 'tick axis-right')
    .select('line').attr('class', 'axis-right');

const dict =  [];
  this.seriesData[0].forEach( (x, i) => {
    const seriesA = {};
    seriesA['x'] = timeSeries[i];
    seriesA['y'] = x;
    dict.push(seriesA);
  });
   // console.log('seriesA ' + JSON.stringify(dict));
   const valueline2 = this.d3.line()
     .x( (d) => xScale(d['x'])).y( d => leftYScale(d['y']));
  //   .x( (d, i) => xScale(this.xAxisData[i]))
  //   .y(d => leftYScale(d));

  svg.append('path')
    .attr('class', 'line left-axis-series')
    .attr('d', valueline2(dict));



  // leftYAxis.append('text').classed('barlabel', true)
  // // .attr('transform', ' translate(' + height + ',0)')
  //   .style('text-anchor', 'right')
  //   //   .style('fill', 'black')
  //   //   .style('font-size', 10)
  //   .attr('dy', '-15em')
  //   .attr('y', 100);


}

}
