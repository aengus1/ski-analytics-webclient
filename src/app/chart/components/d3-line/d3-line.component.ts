import {Component, ElementRef, Input, ViewEncapsulation} from '@angular/core';
import {D3ChartComponent} from '../d3-chart/d3chart.component';
import {LoggerService} from '../../../shared/services/logger.service';
import {D3Service, Selection} from 'd3-ng2-service';
import {ChartOptions, YLabelFormat} from '../d3-bar/ChartOptions';
import {ScaleLinear} from 'd3-scale';
import {DataSeries} from './data-series.model';
import {BaseType} from 'd3-selection';

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

  @Input()
  private filteredIndices: number[];

  private min: any;
  private max: any;
  private margin: any;
  protected logger: LoggerService;
  private axes: any[][] = [];  //  series, scale, axisL, axisR
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
      .style('stroke', this.axes[index][0]._color)
      .call(this.axes[index][2]);

    // axis ticks
    this.lAxis.selectAll('g').classed('tick', true)
      .attr('class', 'tick axis-left')
      .style('font-family', '"Helvetica Neue", Helvetica, Arial, sans-serif')
      .style('font-weight', 'normal')
      .style('font-size', 'normal')
      .style('stroke', this.axes[index][0]._color)
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
      .text(this.axes[index][0]._name);
  }

  public setRightAxis(index: number) {
    this.g.select('g.axis--y.axis-right').remove();
    this.g.select('text.axis--y.axis-right').remove();

    this.rAxis = this.g.append('g').classed('axis--y axis-right', true)
      .attr('transform', 'translate( ' + (this.width - this.margin.left - this.margin.right) + ', 0 )')
      .style('stroke', this.axes[index][0]._color + ' !important;')
      .call(this.axes[index][3]);

    this.rAxis.selectAll('g').classed('tick', true)
      .attr('class', 'tick axis-right')
      .style('font-family', '"Helvetica Neue", Helvetica, Arial, sans-serif')
      .style('font-weight', 'normal')
      .style('font-size', 'normal')
      .style('stroke', this.axes[index][0]._color)
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
      .text(this.axes[index][0]._name);

  }

  public drawFilters(svg: Selection<BaseType, any, null, undefined>) {
    if (this.filteredIndices != null && this.filteredIndices !== []) {
      for (let i = 0; i < this.xSeries.length - 1; i++) {

        // draw filters
        if (this.filteredIndices.includes(i)) {
          let j = 0;
          while (this.filteredIndices.includes(i + j++) && (j + i) < this.xSeries.length - 2) {
          }

          svg.append('rect')
            .attr('x', this.xScale(this.xSeries[i]))
            .attr('y', 0)
            .attr('width', this.xScale(this.xSeries[(j + i)]) - this.xScale(this.xSeries[i]))
            .attr('height', this.height - this.margin.top - this.margin.bottom)
            .style('opacity', 0.5)
            .style('fill', '#f1d8f4');
          i += j;
          if (i >= this.xSeries.length) {
            return;
          }
        }

      }
    }
  }

  public setXAxis(axisFormat: number) {
    this.xAxisFormat = axisFormat;
    switch (this.xAxisFormat) {
      case 0: { // in seconds
        this.xSeries = this.xAxisData.map(x => new Date(x).valueOf());
        this.xScale = this.d3.scaleTime().domain([this.xSeries[0], this.d3.max(this.xSeries)])
          .range([0, (this.width - this.margin.left - this.margin.right)]);
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
          .range([0, (this.width - this.margin.left - this.margin.right)]);
        this.xAxis = this.d3.axisBottom(this.xScale).tickSize(0);
        break;
      }
      case 2: {  // in hh:mm:ss
        this.xSeries = this.xAxisData.map(x => new Date(x).valueOf()
          - (new Date(this.xAxisData[0]).valueOf() - this.d3.timeDay.round(new Date(this.xAxisData[0])).valueOf()));
        this.xScale = this.d3.scaleTime().domain([this.xSeries[0], this.d3.max(this.xSeries)])
          .range([0, (this.width - this.margin.left - this.margin.right)]);
        this.xAxis = this.d3.axisBottom(this.xScale).tickSize(5).tickFormat(this.d3.timeFormat('%H:%M:%S'));
      }
    }
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
    this.setXAxis(this.xAxisFormat);

    // draw filters
    this.drawFilters(svg);

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
      if (!x.enabled) { // only draw enabled series
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

      // the visible series line
      svg.append('path')
        .attr('class', 'line axis-series a' + i)
        .style('stroke', this.axes[i][0]._color)
        .style('z-index', 500)
        .attr('d', valueline(dict));

      // highlight series, enable focus, show series axis on mouseover
      let clicked = false;
      let seriesSelected = -1;

      // focus tracking
      const focus = svg.append('g'); // .style('display', 'none');
      focus.append('line')
        .attr('id', 'focusLineX')
        .attr('class', 'focusLine series' + x.index)
        .style('fill', 'none')
        .style('stroke', 'steelblue')
        .style('stroke-width', '0.5px');
      focus.append('line')
        .attr('id', 'focusLineY')
        .attr('class', 'focusLine series' + x.index)
        .style('fill', 'none')
        .style('stroke', 'steelblue')
        .style('stroke-width', '0.5px');
      focus.append('circle')
        .attr('id', 'focusCircle')
        .attr('r', 3)
        .attr('class', 'circle focusCircle series' + x.index)
        .style('stroke-width', '1px')
        .style('fill', 'red');
      focus.append('rect')
        .attr('id', 'focusPopover')
        .attr('class', 'focusPopover series' + x.index)
        .attr('fill', '#FFF')
        .style('stroke', '#9e9e9e')
        .style('stroke-width', '0.5px')
        .attr('width', 60)
        .attr('height', 30)
        .attr('rx', 5)         // set the x corner curve radius
        .attr('ry', 5)        // set the y corner curve radius
        .style('z-index', '1000');
        focus.append('text')
        .attr('id', 'focusPopoverText')
        .attr('class', 'focusPopoverText series' + x.index)
        .style('text-anchor', 'start')
        .style('z-index', '1000')
        .attr('dx', 5)
        .attr('dy', 10);
      focus.append('text')
        .attr('id', 'focusPopoverText2')
        .attr('class', 'focusPopoverText2 series' + x.index)
        .style('text-anchor', 'start')
        .style('z-index', '1000')
        .attr('dx', 5)
        .attr('dy', 25);

      this.d3.selectAll('.focusLine').style('visibility', 'hidden');
      this.d3.selectAll('.focusCircle').style('visibility', 'hidden');
      this.d3.selectAll('.focusPopover').style('visibility', 'hidden');
      this.d3.selectAll('.focusPopoverText').style('visibility', 'hidden');
      this.d3.selectAll('.focusPopoverText2').style('visibility', 'hidden');

      svg.append('path')
        .style('opacity', 0.0)
        .style('stroke', this.axes[i][0]._color)
        .style('stroke-width', 10)
        .attr('d', valueline(dict))
        .on('mouseover', d => {
          this.d3.selectAll('.line.axis-series.a' + i).style('stroke-width', 3);
          seriesSelected = x.index;
          if (this.lAxisIdx !== this.axes[x.index][0]._index && this.rAxisIdx !== this.axes[x.index][0]._index) {
            console.log('x.index = ' + x.index + ' this.axes[x.index] = ' + JSON.stringify(this.axes[x.index][0]));
            this.setRightAxis(x.index);
           }
        })
        .on('mouseout', d => {
          this.d3.selectAll('.line.axis-series.a' + i).style('stroke-width', '1px');
          if (!clicked) {
            this.setRightAxis(this.rAxisIdx);
          }
          clicked = false;
          seriesSelected = -1;
          this.d3.selectAll('.focusLine').style('visibility', 'hidden');
          this.d3.selectAll('.focusCircle').style('visibility', 'hidden');
          this.d3.selectAll('.focusPopover').style('visibility', 'hidden');
          this.d3.selectAll('.focusPopoverText').style('visibility', 'hidden');
          this.d3.selectAll('.focusPopoverText2').style('visibility', 'hidden');
          // this.d3.selectAll('.focusLineY').remove();
        })
        .on('click', () => {
          this.d3.select(this.d3.event.target).style('stroke-width', '1px');
          if (this.lAxisIdx !== this.axes[x.index][0]._index && this.rAxisIdx !== this.axes[x.index][0]._index) {
            this.rAxisIdx = x.index;
            this.setRightAxis(x.index);
          }
          clicked = true;
        })
        .on('mousemove', () => {
          if (seriesSelected > -1) {
            this.d3.selectAll('.focusLine.series' + seriesSelected).style('visibility', 'visible');
            this.d3.selectAll('.focusCircle.series' + seriesSelected).style('visibility', 'visible');
            this.d3.selectAll('.focusPopover.series' + seriesSelected).style('visibility', 'visible');
            this.d3.selectAll('.focusPopoverText.series' + seriesSelected).style('visibility', 'visible');
            this.d3.selectAll('.focusPopoverText2.series' + seriesSelected).style('visibility', 'visible');
            const mouse = this.d3.mouse(this.d3.event.target);
            const nearest = this.findNearest(this.xScale.invert(mouse[0]));
            // console.log('i = ' + i);
            const xPos = this.xScale(this.xSeries[nearest]);
            const yPos = scale(this.seriesData[x.index][nearest]);
            const f = this.d3.format('.1f');
            // console.log('xPos =  ' + xPos + ' yPos = ' + yPos);
            focus.select('#focusCircle')
              .attr('cx', xPos)
              .attr('cy', yPos);
            focus.select('#focusLineX')
              .attr('x1', xPos).attr('y1', scale(0))
              .attr('x2', xPos).attr('y2', scale(this.d3.max(this.seriesData[x.index])));
            focus.select('#focusLineY')
              .attr('x1', 0)
              .attr('y1', yPos)
              .attr('x2', this.xScale(this.d3.max(this.xSeries)))
                .attr('y2', yPos);
            focus.select('#focusPopover')
              .attr('x', xPos)
              .attr('y', yPos);
            focus.select('#focusPopoverText')
              .attr('x', xPos)
              .attr('y', yPos)
              // .style('fill', 'black')
              // .style('text-shadow', '0 1px 0 #fff, 1px 0 0 #fff, 0 -1px 0 #fff, -1px 0 0 #fff')
              .style('cursor', 'move')
              .text(this.seriesKey[x.index].name.split('(')[0]);
            focus.select('#focusPopoverText2')
              .attr('x', xPos)
              .attr('y', yPos)
              .style('cursor', 'move')
              // .text(f(this.seriesData[x.index][i]))
              .text((x.dataType === YLabelFormat.NUMERIC
                ? (f(this.seriesData[x.index][nearest]) + ' (' + this.seriesKey[x.index].name.split('(')[1])
                  : (this.seriesData[x.index][nearest] + ' (' + this.seriesKey[x.index].name.split('(')[1])));


          }
      });


    });
  }

  /**
   * @param xMouse - xcoordinate of mouse position (in x-axis units)
   * @returns {number} index of nearest item in xSeries
   */
   findNearest(xMouse) {

    let nearest: number = null,
      dx = Number.MAX_VALUE;

    this.xSeries.forEach(function(pt, i) {
      const xData = pt,
        xDiff = Math.abs(xMouse.valueOf() - xData);

      if (xDiff < dx) {
        dx = xDiff;
        nearest = i;
      }
    });
    return nearest;
  }
}

