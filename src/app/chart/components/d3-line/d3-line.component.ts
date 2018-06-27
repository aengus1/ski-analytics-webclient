import {Component, ElementRef, Input, ViewEncapsulation} from '@angular/core';
import {D3ChartComponent} from '../d3-chart/d3chart.component';
import {LoggerService} from '../../../shared/services/logger.service';
import {D3Service, Selection} from 'd3-ng2-service';
import {ChartOptions, YLabelFormat} from '../d3-bar/ChartOptions';
import {ScaleLinear} from 'd3-scale';

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
  private seriesKey: [[string, number, YLabelFormat, string]];  // tuple: name, index of data series in 'seriesData', data type, color

  @Input()
  private showSeries: number[];

  private min: any;
  private max: any;
  private margin: any;
  protected logger: LoggerService;
  private axes: any[][] = [];
  private lAxis: any = null;
  private rAxis: any = null;
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
      this.lAxis = this.g.append('g').classed('axis--y axis-left', true)
        .style('stroke', this.axes[index][0][3])
        .call(this.axes[index][2]);
      this.lAxis.selectAll('g').classed('tick', true)
        .attr('class', 'tick axis-left')
        .style('font-family', '"Helvetica Neue", Helvetica, Arial, sans-serif')
        .style('font-weight', 'normal')
        .style('font-size', 'normal')
        .select('line').attr('class', 'axis-left');
  }

  public setRightAxis(index: number) {
     this.g.select('g.axis--y.axis-right').remove();
      this.rAxis = this.g.append('g').classed('axis--y axis-right', true)
        .attr('transform', 'translate( ' + (this.width - this.margin.left - this.margin.right) + ', 0 )')
        .style('stroke', this.axes[index][0][3] + ' !important;')
        .call(this.axes[index][3]);
      this.rAxis.selectAll('g').classed('tick', true).attr('class', 'tick axis-right')
        .style('stroke', this.axes[index][0][3])
        .style('font-family', '"Helvetica Neue", Helvetica, Arial, sans-serif')
        .style('font-weight', 'normal')
        .style('font-size', 'normal')
        .select('line').attr('class', 'axis-right')
        .style('stroke', this.axes[index][0][3]);


  }


  protected build() {
    const svg = this.d3Svg.append('g').attr('transform', 'translate(' + this.margin.left + ', ' + this.margin.top + ')');
    const width = this.width - this.margin.left - this.margin.right;
    const height = this.height - this.margin.top - this.margin.bottom;

    // todo -> make x axis variable (time, interval, dist) and change interval format to mm:ss
    let timeSeries = this.xAxisData.map(x => new Date(x).valueOf());
    const timeOffset: number = timeSeries[0];
    const toSeconds = x => (x - timeOffset) / 1000;
    timeSeries = timeSeries.map(x => toSeconds(x));
    const xScale = this.d3.scaleLinear().domain([0, this.d3.max(timeSeries)]).range([0, width]);

    const xAxis = this.d3.axisBottom(xScale).tickSize(0);
    const xAxisEl = svg.append('g').classed('axis--x', true)
      .attr('class', 'axis-bottom')
      .style('text-anchor', 'start')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

    /**
     * create an array of axis
     * key:  -ve = currently visible axis, lower number is left axis.
     * number indicates index of data series it represents in seriesData array
     * value: [ ['name:string', 'index: number', format:YLabelFormat], [scale], [axisL], [axisR] (draw elements on demand)
     */
    this.seriesKey.forEach(series => {
      const scale = this.d3.scaleLinear().domain([0, this.d3.max(this.seriesData[series[1]])]).range([height, 0]);
      const axisL = this.d3.axisLeft(scale).ticks(6).tickPadding(5);
      const axisR = this.d3.axisRight(scale).ticks(6).tickPadding(5);
      this.axes.push([series, scale, axisL, axisR]);
    });

    this.setLeftAxis(0);
    this.setRightAxis(1);


    /**
     * draw the enabled series'
     */
    this.showSeries.forEach( (x, i) => {
      const scale: ScaleLinear<number, number> = this.axes[i][1];
      const dict =  [];
      this.seriesData[x].forEach( (v, idx) => {
        const seriesA = {};
        seriesA['x'] = timeSeries[idx];
        seriesA['y'] = v;
        dict.push(seriesA);
      });

      const valueline = this.d3.line()
        .x( (d) => xScale(d['x'])).y( d => scale(d['y']));

      svg.append('path')
        .attr('class', 'line axis-series a' + i)
        .style('stroke', this.axes[i][0][3])
        .attr('d', valueline(dict))
        // TODO -> make lines pop on mouseover and add axis if not currently set
        .on('mouseover', d => {
          console.log('mousein' + JSON.stringify(this.d3.select(this.d3.event.target)));
          this.d3.select(this.d3.event.target).style('stroke-width', 5);
        })
        .on('mouseout', d => {
          console.log('mouseout');
          this.d3.select(this.d3.event.target).style('stroke-width', '1px');
        });
      //
    })

    this.setRightAxis(1);
    this.setLeftAxis(2);

//   const lAxisSeries: number = this.leftAxis['1'];
//   const leftYScale = this.d3.scaleLinear().domain([0, this.d3.max(this.seriesData[this.leftAxis['1']])]).range([height, 0]);
//   const yAxisLeft =  this.d3.axisLeft(leftYScale).ticks(6).tickPadding(5);
//   const yAxisLeftEl = svg.append('g')
//     .classed('axis--y axis-left', true)
//     .call(yAxisLeft);
//   yAxisLeftEl.selectAll('g').classed('tick', true).attr('class', 'tick axis-left')
//     .select('line').attr('class', 'axis-left');
//
//   axes.set(-2, [ this.seriesData[0], leftYScale, yAxisLeft, yAxisLeftEl]);
//
//   const rightYScale = this.d3.scaleLinear().domain([0, this.d3.max(this.seriesData[this.rightAxis['1']])]).range([height, 0]);
//   const yAxisRight = this.d3.axisRight(rightYScale).ticks(6).tickPadding(5);
//   const yAxisRightEl = svg.append('g')
//     .classed('axis--y axis-right', true)
//     .attr('transform', 'translate( ' + width + ', 0 )')
//     .call(yAxisRight);
//   yAxisRightEl.selectAll('g').classed('tick', true).attr('class', 'tick axis-right')
//     .select('line').attr('class', 'axis-right');
//   axes.set(-1, [ this.rightAxis, rightYScale, yAxisRight, yAxisRightEl]);
//
//


// left axis series
// const dictL =  [];
//   this.seriesData[0].forEach( (x, i) => {
//     const seriesA = {};
//     seriesA['x'] = timeSeries[i];
//     seriesA['y'] = x;
//     dictL.push(seriesA);
//   });
//    // console.log('seriesA ' + JSON.stringify(dict));
//    const valueline2 = this.d3.line()
//      .x( (d) => xScale(d['x'])).y( d => leftYScale(d['y']));
//   //   .x( (d, i) => xScale(this.xAxisData[i]))
//   //   .y(d => leftYScale(d));
//
//   svg.append('path')
//     .attr('class', 'line left-axis-series')
//     .attr('d', valueline2(dictL));
//
//   // right axis series
//   const dictR =  [];
//   this.seriesData[1].forEach( (x, i) => {
//     const seriesA = {};
//     seriesA['x'] = timeSeries[i];
//     seriesA['y'] = x;
//     dictR.push(seriesA);
//   });
//   // console.log('seriesA ' + JSON.stringify(dict));
//   const valuelineR = this.d3.line()
//     .x( (d) => xScale(d['x'])).y( d => rightYScale(d['y']));
//   //   .x( (d, i) => xScale(this.xAxisData[i]))
//   //   .y(d => leftYScale(d));
//
//   svg.append('path')
//     .attr('class', 'line right-axis-series')
//     .attr('d', valuelineR(dictR));



  }

}
