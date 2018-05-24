import {Component, ElementRef, Input, ViewEncapsulation} from '@angular/core';
import {D3ChartComponent} from '../components/d3-chart/d3chart.component';
import {D3Service, Selection} from 'd3-ng2-service';
import {LoggerService} from '../../shared/services/logger.service';
import {ChartOptions, ChartOrientation, YLabelFormat} from './ChartOptions';
import {IntervalPipe} from '../../shared/pipes/interval.pipe';


@Component({
  selector: 'app-d3-bar',
  template: `
    <svg></svg>`,
  styleUrls: ['./d3-bar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class D3BarComponent extends D3ChartComponent {

  @Input()
  private yLabel: string;
  @Input()
  private xLabels: string[];

  @Input()
  private chartOptions: ChartOptions;

  private min: any;
  private max: any;
  private margin: any;
  protected logger: LoggerService;

  constructor(element: ElementRef, d3Service: D3Service, logger: LoggerService, private intervalPipe: IntervalPipe) {
    super(element, d3Service, logger);
    this.logger = logger;
    this.intervalPipe.setLeadingZeroes(false);
  }

  public createChart() {
    if (this.width > 0) {
      this.margin = {
        top: this.height * 0.1,
        right: this.width * 0.1,
        bottom: this.height * 0.2,
        left: this.chartOptions.orientation === ChartOrientation.VERTICAL ? this.width * 0.2 : this.width * 0.4
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
    this.logger.info('[D3BarComponent] update chart triggered');
    // base
    if (!this.data) {
      return;
    }
    this.data = this.data.filter(d => (d !== -999));
    const sel = this.d3Svg.selectAll('svg')
      .data([this.data])
      .enter()
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    this.build(<any>sel);

  }

  protected build(g: Selection<any, SVGSVGElement, any, any>) {

    const svg = this.d3Svg.append('g').attr('transform', 'translate(' + this.margin.left + ', ' + this.margin.top + ')');

    const width = this.width - this.margin.left - this.margin.right;
    const height = this.height - this.margin.top - this.margin.bottom;
    const xScale = this.chartOptions.orientation === ChartOrientation.VERTICAL ?
      this.d3.scaleBand().domain(this.xLabels)
        .range([0, width]).paddingInner(this.chartOptions.barSpacing)
      : this.d3.scaleBand().domain(this.xLabels)
        .range([0, height]).paddingInner(this.chartOptions.barSpacing);

    const bandwidth = xScale.bandwidth();
    const maxY = this.d3.max(this.data);

    const yScale = this.chartOptions.orientation === ChartOrientation.VERTICAL ?
      this.d3.scaleLinear().domain([0, maxY])
        .range([height, 0]).nice()
      : this.d3.scaleLinear().domain([0, maxY])
        .range([0, width]).nice();

    const xAxis = this.chartOptions.orientation === ChartOrientation.VERTICAL ? this.d3.axisBottom(xScale).tickSize(0) :
      this.d3.axisLeft(xScale).tickSize(0);
    const yAxis = this.chartOptions.orientation === ChartOrientation.VERTICAL ? this.d3.axisLeft(yScale).ticks(6) :
      this.d3.axisBottom(yScale).ticks(4);

    if (this.chartOptions.orientation === ChartOrientation.VERTICAL) {
      svg.append('g').classed('axis--x', true)
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);
    } else {
      svg.append('g').classed('axis--x', true).call(xAxis);
    }



    const barHolder = svg.append('g').classed('bar-holder', true);

    const bars = barHolder.selectAll('rect.bar');

    // .attr('x', this.chartOptions.orientation === ChartOrientation.VERTICAL ? (d, i) => xScale(this.xLabels[i]) : (d) => 0)
    // .attr('width', this.chartOptions.orientation === ChartOrientation.VERTICAL ? bandwidth : (d) => yScale(d))
    // .attr('y', (d) => yScale(d))
    // .attr('height', (d) => height - yScale(d));

    if (this.chartOptions.orientation === ChartOrientation.VERTICAL) {
      bars.data(this.data)
        .enter().append('rect').classed('bar', true)
        .attr('width', bandwidth)
        .attr('height', (d) => height - yScale(d))
        .attr('x', (d, i) => xScale(this.xLabels[i]))
        .attr('y', (d) => yScale(d));
    } else {
      bars.data(this.data)
        .enter().append('rect').classed('bar', true)
        .attr('width', (d) => yScale(d))
        .attr('height', bandwidth)
        .attr('x', 0)
        .attr('y', (d, i) => xScale(this.xLabels[i]));
    }

    if (this.chartOptions.hasNumLabel) {
      svg.append('g').classed('bar-text', true).selectAll('text').data(this.data).enter()
        .append('text')
        .style('text-anchor', 'middle')
        .attr('fill', 'black')
        .attr('font-size', 10)
        .attr('x', this.chartOptions.orientation === ChartOrientation.VERTICAL ? (d, i) => bandwidth * i : (d) => yScale(d))
        .attr('y', this.chartOptions.orientation === ChartOrientation.VERTICAL ?  (d) => yScale(d) : (d, i) => bandwidth * i )
        .attr('dx', this.chartOptions.orientation === ChartOrientation.VERTICAL ? bandwidth / 2 : '0.5em')
        .attr('dy', this.chartOptions.orientation === ChartOrientation.VERTICAL ? '-0.2em' : bandwidth / 2 )
        .text((d: number) => this.chartOptions.yLabelFormat === YLabelFormat.NUMERIC ? d : this.intervalPipe.transform(d));
    }

    if (this.chartOptions.orientation === ChartOrientation.VERTICAL && this.chartOptions.hasNumAxis) {
      const yAxisEle = svg.append('g').classed('axis--y', true).call(yAxis);

      yAxisEle.append('text')
        .attr('transform', 'rotate(-90) translate(' + height / 2 + ',0)')
        .style('text-anchor', 'middle')
        .style('fill', 'black')
        .attr('dy', '-2.5em')
        .attr('y', this.margin.top)
        .style('font-size', 10);
    } else if (this.chartOptions.orientation === ChartOrientation.HORIZONTAL && this.chartOptions.hasNumAxis) {
      const yAxisEle = svg.append('g').classed('axis--y', true).call(yAxis);

      yAxisEle.append('text')
      // .attr('transform', ' translate(' + height + ',0)')
        .style('text-anchor', 'middle')
        .style('fill', 'black')
        .attr('dy', '-2.5em')
        .attr('y', 100)
        .style('font-size', 10);
    }


  }


  // const c = this;
  // const x = this.d3.scaleBand().rangeRound([0, this.width - this.margin.left - this.margin.right]).padding(0.1);
  // const y = this.d3.scaleLinear().rangeRound([this.height, 0]);
  //
  //   x.domain(this.data.map(function(d, i) { return c.xLabels[i]; }));
  //   y.domain([0, this.d3.max(this.data, function(d) { return d; })]);
  //
  // g.append('g').attr('class', 'axis axis--x')
  //   .attr('transform', 'translate(0,' + this.height + ')')
  //   .call(this.d3.axisBottom(x));
  //
  // g.append('g').attr('class', 'axis axis--y')
  //   .call(this.d3.axisLeft(y).ticks(6))
  //   .append('text')
  //   .attr('transform', 'rotate(-90)')
  //   .attr('y', 6)
  //   .attr('dy', '0.71em')
  //   .attr('text-anchor', 'end')
  //   .text('Type');
  //
  // console.log(' x (0) = ' + x(''));
  // let i = 0;
  //   g.selectAll('.bar')
  //     .data(this.data)
  //     .enter().append('rect')
  //     .attr('class', 'bar')
  //     .attr('x', d => x(this.xLabels[i++]))
  //     .attr('y', d => y(d))
  //     .attr('width', x.bandwidth())
  //     .attr('height', d => this.height - y(d));
  //
  //   i = 0;
  //   g.data(this.data).enter().append('text')
  //     .attr('x', (d) => {
  //       console.log('d = ' + d);
  //       return x.bandwidth() * i;
  //     })
  //     .attr('y', (d) => y(d))
  //     .attr('dy', '.35em')
  //     .text((d: number) => d);
  // }

}
