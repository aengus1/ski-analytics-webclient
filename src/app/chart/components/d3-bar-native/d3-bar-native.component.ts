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
import {ChartOptions} from '../../ChartOptions';
import {IntervalPipe} from '../../../shared/pipes/interval.pipe';
import {ChartOrientation} from '../d3-bar/ChartOptions';


@Component({
  selector: 'app-d3-bar-native',
  template: `
    <svg [attr.width]="this.width" [attr.height]="this.height">
      <svg:g [attr.transform]="'translate('+ (this.margin) +','+ (this.margin) +')'">
        <svg:g #xaxis class="axis--x" [attr.transform]="getTranslate()"
               fill="none" font-size="10" font-family="sans-serif"
               text-anchor="middle" style="text-anchor; start">
          <svg:path class="domain" stroke="#000" [attr.d]="getXaxis()"></svg:path>
        </svg:g>
        <svg:g class="bar-holder">
          <svg:rect *ngFor="let bar of data; index as i;" class="bar"
                    [attr.width]="getBarWidth(bar)"
                    [attr.x]="getBarX(i)"
                    [attr.y]="getBarY(i, bar)"
                    [attr.height]="getHeight(bar)">
          </svg:rect>
        </svg:g>
        <svg:g class="bar-text">
          <svg:text *ngFor="let t of data; index as i;" class="bar-text"
                    [attr.width]="this.graphicWidth/data.length"
                    [attr.height]="this.getHeight(t)"
                    [attr.x]="getLabelX(i)"
                    [attr.y]="getLabelY(i, t)"
                    [attr.dx]="getLabelDx(i)"
                    [attr.dy]="getLabelDy(i,t)"
                    style="display: inline; font-size: 0.6em;">
            {{this.intervalPipe.transform(t)}}
          </svg:text>
        </svg:g>
        <svg:g class="bar-text">
          <svg:text *ngFor="let t of data; index as i;" class="bar-text barlabel"
                    [attr.transform]="'rotate(-90) translate(' + this.graphicHeight / 2 + ',0)'"
                    [attr.width]="(width-margin-margin)/data.length"
                    [attr.height]="this.getHeight(t)"
                    [attr.dy] = "'-2.8em'"
                    [attr.y]="this.margin"
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
  private bandwidth = null;
  private graphicWidth = null;
  private graphicHeight = null;


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
    this.graphicHeight = this.height - (2 * this.margin);
    this.graphicWidth = this.width - (2 * this.margin);
    this.maxY = this.d3.max(this.data);
    // this.yScale = this.d3.scaleLinear().domain([0, this.maxY]).range([this.height, 0]).nice();
    // this.xScale = this.d3.scaleBand().domain(this.xLabels).range([0, this.width]).paddingInner(this.chartOptions.barSpacing);

    this.xScale = this.chartOptions.orientation === ChartOrientation.VERTICAL ?
      this.d3.scaleBand().domain(this.xLabels)
        .range([0, this.graphicWidth]).paddingInner(this.chartOptions.barSpacing)
      : this.d3.scaleBand().domain(this.xLabels)
        .range([0, this.graphicHeight]).paddingInner(this.chartOptions.barSpacing);

    this.yScale = this.chartOptions.orientation === ChartOrientation.VERTICAL ?
      this.d3.scaleLinear().domain([0, this.maxY])
        .range([this.graphicHeight, 0]).nice()
      : this.d3.scaleLinear().domain([0, this.maxY])
        .range([0, this.graphicWidth]).nice();

    this.bandwidth = this.xScale.bandwidth();
  }

  getXaxis(): string {
    this.d3.axisBottom(this.xScale).tickSize(0);
    return 'M0,0H' + this.width;
  }

  public getHeight(item: number): number {
    if (this.chartOptions.orientation === ChartOrientation.VERTICAL) {
      return this.graphicHeight - this.yScale(item);
    } else {
      return this.bandwidth;
    }
  }

  public getBarX(i: number): number {
    return this.chartOptions.orientation === ChartOrientation.VERTICAL ?
      this.xScale(this.xLabels[i]) : 0;
  }
  public getBarY(i: number, item: number): number {
    return this.chartOptions.orientation === ChartOrientation.VERTICAL ?
      this.yScale(item) : this.xScale(this.xLabels[i]);
  }
  public getBarWidth(item: number): number {
    return this.chartOptions.orientation === ChartOrientation.VERTICAL ?
      this.bandwidth : this.yScale(item);
  }

  public getTranslate(): string {
    if (this.chartOptions.orientation === ChartOrientation.VERTICAL) {
      return 'translate(0,' + this.height + ')';
    } else {
      return 'translate(' + -( this.margin) + ',0)';
    }
  }

  public getLabelX(i: number): number {
    if (this.chartOptions.orientation === ChartOrientation.VERTICAL) {
      return this.bandwidth * i;
    } else {
      return this.graphicWidth / 2;
    }
  }

  public getLabelY(i: number, item: number): number {
    if (this.chartOptions.orientation === ChartOrientation.VERTICAL) {
      return this.yScale(item);
    } else {
      return this.bandwidth * i;
    }
  }

  public getLabelDx(i: number): number {
    if (this.chartOptions.orientation === ChartOrientation.VERTICAL) {
      return this.bandwidth / 2;
    } else {
      return 0;
    }
  }

  public getLabelDy(i: number, item: number): number {
    if (this.chartOptions.orientation === ChartOrientation.VERTICAL) {
      return 0;
    } else {
      return this.bandwidth / 2;
    }
  }
}
