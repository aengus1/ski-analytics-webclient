import {Component, ElementRef, Input, ViewEncapsulation} from '@angular/core';
import {D3ChartComponent} from '../d3-chart/d3chart.component';
import {D3Service, Selection} from 'd3-ng2-service';
import {LoggerService} from '../../../shared/services/logger.service';


@Component({
  selector: 'app-d3-radial',
  template: `<svg></svg>`,
  styleUrls: ['./d3-radial.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class D3RadialComponent extends D3ChartComponent {

  constructor(element: ElementRef, d3Service: D3Service, logger: LoggerService) {
    super(element, d3Service, logger);
    this.logger = logger;
  }

  // private min: any;
  // private max: any;
  private margin: any;
  protected logger: LoggerService;

  @Input()
  public binSize = 5;

  @Input()
  public data: number[];  // size = 18  90-85, 85-80.... -85- -90


  public createChart() {
    if (this.width > 0) {
      // this.margin = {
      //   top: this.height * 0.0,
      //   right: this.width * 0.0,
      //   bottom: this.height * 0.0,
      //   left:  this.width * 0.0
      // };
    }
    // set up the svg element and the chart
    if (this.parentNativeElement !== null) {
      this.d3Svg.attr('width', this.width);
      this.d3Svg.attr('height', this.height);
    }
  }

  public updateChart() {
    this.logger.info('[D3RadialComponent] update chart triggered');
    // base
    if (!this.data) {
      return;
    }
    this.data = this.data.filter(d => (d !== -999 && !isNaN(d)));
    const sel = this.d3Svg.selectAll('svg')
      .data([this.data])
      .enter()
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    this.build(<any>sel);
  }

  protected build(g: Selection<any, SVGSVGElement, any, any>) {


    const width = +this.d3Svg.attr('width');
    const height = +this.d3Svg.attr('height');
    const innerRadius = 0;
    const outerRadius = Math.min(width, height) * 0.35;
    const svg = this.d3Svg.append('g')
      .attr('transform', 'translate(' + (width * 0.7) + ',' + (height * 0.45) + ')');
    const yScale = this.d3.scaleLinear().range([innerRadius, outerRadius]);
    yScale.domain([0, this.d3.max(this.data)]);

    const innerArc = this.d3.arc();
    innerArc({
      innerRadius: 1,
      outerRadius: 10,
      startAngle: 0,
      endAngle: Math.PI
    });


    // draw the x (value) axis
    const valueAxis = this.d3.axisBottom(yScale).ticks(2);
    g.append('g').attr('class', 'axis--x')
      .attr('transform', 'translate(' + this.width * 0.2 + ',' + this.height * 0.45 + ')')
       .call(valueAxis);

    // draw the outer radial axis ticks
    const outerAxis = g.append('g').attr('class', 'a axis')
      .attr('transform', 'translate(' + this.width * 0.2 + ',' + this.height * 0.45 + ')' )
      .selectAll('g').data(this.d3.range(-90, 91, 30))
      .enter().append('g').attr('transform', d => 'rotate(' + -d + ')');

    outerAxis.append('text')
      .style('text-anchor', 'middle')
      .style('fill', 'black')
      .style('font-size', 10)
      .attr('x', outerRadius + 8 ).attr('dy', '0.35em').style('text-anchor', (d: number) => d > 90 ? 'end' : null )
      .attr('transform', d => d > 90 ? 'rotate(180 ' + (outerRadius) + ', 0)' : null)
      .text(d => d + '°');


    // draw the radial axis lines.  Note that we are using the value ticks (not drawn) to get the position for these axis lines
    const radialTicks: number[] = new Array<number>();
    this.d3Svg.call(valueAxis).selectAll('.tick').each( (d: number) => {
      radialTicks.push(d);
    });

    const axisLines = svg.append('g').classed('axis', true).attr('transform', 'translate(' + -this.width / 2 + ',' + 0 + ')');
    axisLines.selectAll('axis').data(radialTicks).enter().append('path').attr('class', 'arc-axis')
      .attr('d', (d) => <any> innerArc( {
        startAngle: 0,
        endAngle: Math.PI,
        innerRadius: 0,
        outerRadius: yScale(d)
      }));

    // draw the radial segments
    const segmentHolder = svg.append('g').classed('segments', true).attr('transform', 'translate(' + -this.width / 2 + ',' + 0 + ')');
    const segments = segmentHolder.selectAll('segments');

    segments.data(this.data)
      .enter()
      .append('path').attr('class', 'segment')
      .attr('d', (d, i) => <any> innerArc(
        {startAngle: i * (Math.PI / 180) * this.binSize,
          endAngle: (i + 1 ) * (Math.PI / 180) * this.binSize,
          innerRadius: 0,
          outerRadius: yScale(d)}));
  }

}
