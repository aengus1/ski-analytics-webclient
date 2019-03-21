import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {D3ChartComponent} from '../d3-chart/d3chart.component';
import {D3Service} from 'd3-ng2-service';
import {LoggerService} from '../../../shared/services/logger.service';
import {ChartOptions} from './ChartOptions';
import {IntervalPipe} from '../../../shared/pipes/interval.pipe';


@Component({
  selector: 'app-d3-bar-native',
  template: `
    <svg width="[width]" height="[height]">
      <svg:g [attr.transform]="'translate('+ margin +','+ margin +')'">
        <svg:g #xaxis class="axis--x" [attr.transform]="'translate(0,'+height+')'"
               fill="none" font-size="10" font-family="sans-serif"
               text-anchor="middle" style="text-anchor; start">
          <svg:path class="domain" stroke="#000" [attr.d]="getXaxis()"></svg:path>
        </svg:g>
          <svg:g class="bar-holder">
            <svg:rect *ngFor="let bar of data; index as i;" class="bar"
                      [attr.width]="(width-margin-margin)/data.length"
                      [attr.height]="this.getHeight(bar)"
                      [attr.x]="this.xScale(this.xLabels[i])"
                      [attr.y]="this.yScale(bar)">
            </svg:rect>
          </svg:g>
          <svg:g class="bar-text">
            <svg:text *ngFor="let t of data; index as i;" class="bar-text"
                      [attr.width]="(width-margin-margin)/data.length"
                      [attr.height]="this.getHeight(t)"
                      [attr.x]="this.xScale(this.xLabels[i])"
                      [attr.y]="this.yScale(t) * 0.9"
                      style="display: inline; font-size: 0.6em;">
              {{this.intervalPipe.transform(t)}}
            </svg:text>
          </svg:g>
        <svg:g class="bar-text">
          <svg:text *ngFor="let t of data; index as i;" class="bar-text"
                    [attr.width]="(width-margin-margin)/data.length"
                    [attr.height]="this.getHeight(t)"
                    [attr.x]="this.xScale(this.xLabels[i])"
                    [attr.y]="height * 1.1"
                    style="display: inline; font-size: 0.6em;">
            {{this.xLabels[i]}}
          </svg:text>
        </svg:g>
        </svg:g>
        </svg>`,
  styleUrls: ['./d3-bar-native.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class D3BarNativeComponent extends D3ChartComponent implements OnInit {

  @Input()
  width: number;

  @Input()
  height: number;

  @Input()
  data: number[];

  @Input()
  margin: number;

  @Input()
  private yLabel: string;

  @Input()
  private xLabels: string[];

  @Input()
  private chartOptions: ChartOptions;

  @ViewChild('xaxis') xaxisElement;

  private min: any;
  private max: any;
  protected logger: LoggerService;

  private maxY = null;
  private yScale = null;
  private xScale = null;


  constructor(element: ElementRef, d3Service: D3Service, logger: LoggerService, private intervalPipe: IntervalPipe) {
    super(element, d3Service, logger);
    this.logger = logger;
    this.intervalPipe.setLeadingZeroes(false);
    this.margin = 15;
    // this.maxY = this.d3.max(this.data);
    // this.yScale = this.d3.scaleLinear().domain([0, this.maxY]).range([this.height, 0]).nice()
    // : this.d3.scaleLinear().domain([0, this.maxY])
    //   .range([0, this.width]).nice();

  }

  ngOnInit() {
    this.maxY = this.d3.max(this.data);
    this.yScale = this.d3.scaleLinear().domain([0, this.maxY]).range([this.height, 0]).nice();
    this.xScale = this.d3.scaleBand().domain(this.xLabels).range([0, this.width]).paddingInner(0);

    // : this.d3.scaleBand().domain(this.xLabels)
    //   .range([0, height]).paddingInner(this.chartOptions.barSpacing);
  }

  getXaxis(): string {
    this.d3.axisBottom(this.xScale).tickSize(0)
    return 'M0,0H' + this.width;
  }

  public createChart() {
    if (this.width > 0) {
      // this.margin = {
      //   top: this.height * 0.1,
      //   right: this.width * 0.1,
      //   bottom: this.height * 0.2,
      //   left: this.chartOptions.orientation === ChartOrientation.VERTICAL ? this.width * 0.1 : this.width * 0.4
      // };
    }
    this.min = Infinity;
    this.max = -Infinity;

    // set up the svg element and the chart
    if (this.parentNativeElement !== null) {
      this.d3Svg.attr('width', this.width);
      this.d3Svg.attr('height', this.height);
    }
  }


  public getHeight(item: number): number {
    return this.height - this.yScale(item);
  }

  public getY(item: number): number {
    return 0;
  }


  public updateChart() {
    this.logger.info('[D3BarComponent] update chart triggered');
    // base
    if (!this.data) {
      return;
    }
    this.data = this.data.filter(d => (d !== -999 && !isNaN(d)));
    // const sel = this.d3Svg.selectAll('svg')
    //   .data([this.data])
    //   .enter()
    //   .append('g')
    //   .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
    //
    // this.build(<any>sel);

  }

  // protected build(g: Selection<any, SVGSVGElement, any, any>) {
  //
  //   const svg = this.d3Svg.append('g').attr('transform', 'translate(' + this.margin.left + ', ' + this.margin.top + ')');
  //   // const width = this.width - this.margin.left - this.margin.right;
  //   // const height = this.height - this.margin.top - this.margin.bottom;
  //   const xScale = this.chartOptions.orientation === ChartOrientation.VERTICAL ?
  //     this.d3.scaleBand().domain(this.xLabels)
  //       .range([0, width]).paddingInner(this.chartOptions.barSpacing)
  //     : this.d3.scaleBand().domain(this.xLabels)
  //       .range([0, height]).paddingInner(this.chartOptions.barSpacing);
  //
  //   const bandwidth = xScale.bandwidth();
  //   const maxY = this.d3.max(this.data);
  //
  //   const yScale = this.chartOptions.orientation === ChartOrientation.VERTICAL ?
  //     this.d3.scaleLinear().domain([0, maxY])
  //       .range([height, 0]).nice()
  //     : this.d3.scaleLinear().domain([0, maxY])
  //       .range([0, width]).nice();
  //
  //   const xAxis = this.chartOptions.orientation === ChartOrientation.VERTICAL ? this.d3.axisBottom(xScale).tickSize(0) :
  //     this.d3.axisLeft(xScale).tickSize(0);
  //   const yAxis = this.chartOptions.orientation === ChartOrientation.VERTICAL ? this.d3.axisLeft(yScale).ticks(6).tickPadding(50) :
  //     this.d3.axisBottom(yScale).ticks(4);
  //
  //   if (this.chartOptions.orientation === ChartOrientation.VERTICAL) {
  //     svg.append('g').classed('axis--x', true)
  //       .style('text-anchor', 'start')
  //       .attr('transform', 'translate(0,' + height + ')')
  //       .call(xAxis);
  //   } else {
  //     svg.append('g').classed('axis--x', true)
  //       .style('text-anchor', 'start')
  //       .attr('transform', 'translate(-15,0)')
  //       .call(xAxis);
  //   }
  //
  //
  //   const barHolder = svg.append('g').classed('bar-holder', true);
  //
  //   const bars = barHolder.selectAll('rect.bar');
  //
  //   // .attr('x', this.chartOptions.orientation === ChartOrientation.VERTICAL ? (d, i) => xScale(this.xLabels[i]) : (d) => 0)
  //   // .attr('width', this.chartOptions.orientation === ChartOrientation.VERTICAL ? bandwidth : (d) => yScale(d))
  //   // .attr('y', (d) => yScale(d))
  //   // .attr('height', (d) => height - yScale(d));
  //
  //   if (this.chartOptions.orientation === ChartOrientation.VERTICAL) {
  //     bars.data(this.data)
  //       .enter().append('rect').classed('bar', true)
  //     // .classed('selected_bar', (d, i) => i === 1)  TODO -> add input for 'selected' bars and change color
  //       .attr('width', bandwidth)
  //       .attr('height', (d) => height - yScale(d))
  //       .attr('x', (d, i) => xScale(this.xLabels[i]))
  //       .attr('y', (d) => yScale(d));
  //   } else {
  //     bars.data(this.data)
  //       .enter().append('rect').classed('bar', true)
  //       .attr('width', (d) => yScale(d))
  //       .attr('height', bandwidth)
  //       .attr('x', 0)
  //       .attr('y', (d, i) => xScale(this.xLabels[i]));
  //   }
  //
  //   if (this.chartOptions.hasNumLabel) {
  //     const label = svg.append('g').classed('bar-text', true).selectAll('text').data(this.data).enter()
  //       .append('text').classed('barlabel', true)
  //       // .style('text-anchor', 'middle')
  //       // .attr('fill', 'black')
  //       // .attr('font-size', 10)
  //       .attr('x', this.chartOptions.orientation === ChartOrientation.VERTICAL
  //         ? (d, i) => bandwidth * i : (dl) => width / 2) // (d) => yScale(d))
  //       .attr('y', this.chartOptions.orientation === ChartOrientation.VERTICAL ?
  //         (d) => yScale(d) : (d, i) => bandwidth * i)
  //       .attr('dx', this.chartOptions.orientation === ChartOrientation.VERTICAL ? bandwidth / 2 : 0)
  //       .attr('dy', this.chartOptions.orientation === ChartOrientation.VERTICAL ? '-0.2em' : bandwidth / 2);
  //     if (this.chartOptions.hideZeroLabels) {
  //       label.style('display', (d: number) => (d === 0) ? 'none' : 'inline');
  //     }
  //     label.text((d: number) => this.chartOptions.yLabelFormat === YLabelFormat.NUMERIC ? d : this.intervalPipe.transform(d));
  //
  //   }
  //
  //   if (this.chartOptions.orientation === ChartOrientation.VERTICAL && this.chartOptions.hasNumAxis) {
  //     const yAxisEle = svg.append('g').classed('axis--y', true).call(yAxis);
  //
  //     yAxisEle.append('text').classed('barlabel', true)
  //       .attr('transform', 'rotate(-90) translate(' + height / 2 + ',0)')
  //       // .style('text-anchor', 'middle')
  //       // .style('fill', 'black')
  //       // .style('font-size', 10)
  //       .attr('dy', '-2.8em')
  //       .attr('y', this.margin.top);
  //   } else if (this.chartOptions.orientation === ChartOrientation.HORIZONTAL && this.chartOptions.hasNumAxis) {
  //     const yAxisEle = svg.append('g').classed('axis--y', true).call(yAxis);
  //
  //     yAxisEle.append('text').classed('barlabel', true)
  //     // .attr('transform', ' translate(' + height + ',0)')
  //       .style('text-anchor', 'right')
  //       //   .style('fill', 'black')
  //       //   .style('font-size', 10)
  //       .attr('dy', '-15em')
  //       .attr('y', 100);
  //   }
  //
  //
  // }
  //

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
