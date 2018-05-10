import {Component, ElementRef, ViewEncapsulation} from '@angular/core';
import {D3ChartComponent} from '../d3-chart/d3chart.component';
import {D3Service} from 'd3-ng2-service';
import {BoxPlot} from './boxplot';
import { LoggerService} from '../../../shared/services/logger.service';


@Component({
  selector: 'app-d3-boxplot',
  template: `<svg></svg>`,
  styleUrls: ['./d3-boxplot.component.css'],
  encapsulation: ViewEncapsulation.None      // this forces angular to respect css class names on d3 elements
})
export class D3BoxplotComponent extends D3ChartComponent {

  private min: any;
  private max: any;
  private chart: BoxPlot;
  private margin: any;
  protected logger: LoggerService;

  constructor(element: ElementRef, d3Service: D3Service, logger: LoggerService) {
    super(element, d3Service, logger);
    this.logger = logger;
  }

  public createChart() {
    if (this.width > 0) {
      this.margin = {top: this.height / 20, right: this.width / 4, bottom: this.height / 20, left: this.width / 4};
    }
    this.min = Infinity;
    this.max = -Infinity;

     // set up the svg element and the chart
    if (this.parentNativeElement !== null) {
      this.d3Svg.attr('width', this.width);
      this.d3Svg.attr('height', this.height);
      this.d3Svg.attr('class', 'box');

      this.chart = new BoxPlot(this.d3);
      this.chart.whiskers(this.iqr(1.5));
      this.chart.width(this.width - this.margin.left - this.margin.right);
      this.chart.height(this.height - this.margin.top - this.margin.bottom);
    }
  }


  public updateChart() {
    this.logger.info('[D3BoxPlotComponent] update chart triggered');
    // base
    if (!this.data) {
      return;
    }
    this.data = this.data.filter(d => (d !== -999));
    this.calcMinMax();
    const sel = this.d3Svg.selectAll('svg')
      .data([this.data])
      .enter()
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    this.chart.build(<any>sel);

  }


  /*
   * calculate interquartile range
   */
  private iqr(k: number): (number) => number[] {
    return function (d) {
      const q1 = d.quartiles[0],
        q3 = d.quartiles[2],
        iqr = (q3 - q1) * k;
      let j = d.length;
      let i = -1;
      while (d[++i] < q1 - iqr) {
      }
      while (d[--j] > q3 + iqr) {
      }
      return [i, j];
    };
  }

  /*
   * calculates range of chart domain based on first dimension of multidimensional dataset
   */
  private calcMinMax(): void {
    for (let i = 0; i < this.data.length; i++) {

      if (this.data[i] < this.min) {
        this.min = this.data[i];
      }
      if (this.data[i] > this.max) {
        this.max = this.data[i];
      }
    }
    this.chart.domain([this.min, this.max]);
  }

}
