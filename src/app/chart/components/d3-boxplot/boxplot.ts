/* tslint:disable:no-bitwise */
import {D3, Selection} from 'd3-ng2-service';

export class BoxPlot {
  private width_v: number;
  private height_v: number;
  private whiskers_v: ((number) => number[]);
  private domain_v;
  private d3: D3;


  constructor(d3: D3) {
    this.width_v = 1;
    this.height_v = 1;
    this.whiskers_v = null;
    this.d3 = d3;
  }


  // public clear(g: Selection<any, SVGSVGElement, any, any>): Selection<any, SVGSVGElement, any, any> {
  //   g.selectAll('rect.box').exit().remove();
  //   g.selectAll('line.center').exit().remove();
  //   g.selectAll('line.median').exit().remove();
  //   g.selectAll('line.whisker').exit().remove();
  //   g.selectAll('circle.outlier').exit().remove();
  //   g.selectAll('text.box').exit().remove();
  //   g.selectAll('text.whisker').exit().remove();
  //   return g;
  // }
  /**
   * Builds the box plot based on a D3 SVG selection using the provided d3 service
   * @param {Selection<any, SVGSVGElement, any, any>} g
   */
  public build(g: Selection<any, SVGSVGElement, any, any>): void {
    // g = this.clear(g);
    const value = Number;
    const duration = 0;
    const tickFormat = null;
    const widthV: number = this.width_v;
    const heightV: number = this.height_v;
    const domainV = this.domain_v;
    const whiskers: any = this.whiskers_v;
    const d3 = this.d3;
    let chart: any;
    const quartiles = (d) => {
      return [
        d3.quantile(d, .25),
        d3.quantile(d, .5),
        d3.quantile(d, .75)
      ];
    };

    g.each(function (d: any, i) {
      d = d.sort(d3.ascending);
      const n = d.length,
        min = d[0],
        max = d[n - 1];

      // Compute quartiles. Must return exactly 3 elements.
      const quartileData = d.quartiles = quartiles(d);


      // Compute whiskers. Must return exactly 2 elements, or null.
      const whiskerIndices = whiskers && whiskers.call(this, d, i),
        whiskerData = whiskerIndices && whiskerIndices.map(function (ii) {
          return d[ii];
        });

      // Compute outliers. If no whiskers are specified, all data are "outliers".
      // We compute the outliers as indices, so that we can join across transitions!
      const outlierIndices = whiskerIndices
        ? d3.range(0, whiskerIndices[0]).concat(d3.range(whiskerIndices[1] + 1, n))
        : d3.range(n);


      // Compute the new x-scale.
      const x1 = d3.scaleLinear()
        .domain([min, max])
        .range([heightV, 0]);
      // Retrieve the old x-scale, if this is an update.
      const x0 = chart || d3.scaleLinear()
        .domain([0, Infinity])
        .range(x1.range());

      // Stash the new scale.
      chart = x1;

      // Note: the box, median, and box tick elements are fixed in number,
      // so we only have to handle enter and update. In contrast, the outliers
      // and other elements are variable, so we need to exit them! Variable
      // elements also fade in and out.

      // Update center line: the vertical line spanning the whiskers.
      const center = g.selectAll('line.center')
        .data(whiskerData ? [whiskerData] : []);
      center.enter().insert('line', 'rect')
        .attr('class', 'center')
        .attr('x1', widthV / 2)
        .attr('y1', function (dd) {
          return x0(dd[0]);
        })
        .attr('x2', widthV / 2)
        .attr('y2', function (dd) {
          return x0(dd[1]);
        })
        .style('opacity', 1e-6)
        // .transition()
        // .duration(duration)
        .style('opacity', 1)
        .attr('y1', function (dd) {
          return x1(dd[0]);
        })
        .attr('y2', function (dd) {
          return x1(dd[1]);
        });

      // center.transition()
      //   .duration(duration)
      //   .style('opacity', 1)
      //   .attr('y1', function (dd) {
      //     return x1(dd[0]);
      //   })
      //   .attr('y2', function (dd) {
      //     return x1(dd[1]);
      //   });

      center.exit()
        // .transition()
        // .duration(duration)
        .style('opacity', 1e-6)
        .attr('y1', function (dd) {
          return x1(dd[0]);
        })
        .attr('y2', function (dd) {
          return x1(dd[1]);
        })
        .remove();

      // Update innerquartile box.
      const box = g.selectAll('rect.box')
        .data([quartileData]);
      box.enter().append('rect')
        .attr('class', 'box')
        .attr('x', 0)
        .attr('y', function (dd) {
          return x0(dd[2]);
        })
        .attr('width', widthV)
        .attr('height', function (dd) {
          return x0(dd[0]) - x0(dd[2]);
        })
        // .transition()
        // .duration(duration)
        .attr('y', function (dd) {
          return x1(dd[2]);
        })
        .attr('height', function (dd) {
          return x1(dd[0]) - x1(dd[2]);
        });

      // Update median line.
      const medianLine = g.selectAll('line.median')
        .data([quartileData[1]]);

      medianLine.enter().append('line')
        .attr('class', 'median')
        .attr('x1', 0)
        .attr('y1', x0)
        .attr('x2', widthV)
        .attr('y2', x0)
        // .transition()
        // .duration(duration)
        .attr('y1', x1)
        .attr('y2', x1);

      // Update whiskers.
      const whisker = g.selectAll('line.whisker')
        .data(whiskerData || []);

      whisker.enter().insert('line', 'circle, text')
        .attr('class', 'whisker')
        .attr('x1', 0)
        .attr('y1', x0)
        .attr('x2', widthV)
        .attr('y2', x0)
        .style('opacity', 1e-6)
        // .transition()
        // .duration(duration)
        .attr('y1', x1)
        .attr('y2', x1)
        .style('opacity', 1);

      whisker
        // .transition()
        // .duration(duration)
        .attr('y1', x1)
        .attr('y2', x1)
        .style('opacity', 1);

      whisker.exit()
        // .transition()
        // .duration(duration)
        .attr('y1', x1)
        .attr('y2', x1)
        .style('opacity', 1e-6)
        .remove();

      // Update outliers.
      const outlier = g.selectAll('circle.outlier')
        .data(outlierIndices);

      outlier.enter().insert('circle', 'text')
        .attr('class', 'outlier')
        .attr('r', 1)
        .attr('cx', widthV / 2)
        .attr('cy', function (ii: number) {
          return x0(d[ii]);
        })
        .style('opacity', 1e-6)
        // .transition()
        // .duration(duration)
        .attr('cy', function (ii: number) {
          return x1(d[ii]);
        })
        .style('opacity', 1);

      outlier
        // .transition()
        // .duration(duration)
        .attr('cy', function (ii: number) {
          return x1(d[ii]);
        })
        .style('opacity', 1);

      outlier.exit()
        // .transition()
        // .duration(duration)
        .attr('cy', function (ii: number) {
          return x1(d[ii]);
        })
        .style('opacity', 1e-6)
        .remove();

      // Compute the tick format.
      const format = tickFormat || x1.tickFormat(8);

      // Update box ticks.
      const boxTick = g.selectAll('text.box')
        .data(quartileData);

      boxTick.enter().append('text')
        .attr('class', 'box')
        .attr('dy', '.3em')
        .attr('dx', function (dd, ii) {
          return ii & 1 ? 6 : -6;
        })
        .attr('x', function (dd, ii) {
          return ii & 1 ? widthV : 0;
        })
        .attr('y', x0)
        .attr('text-anchor', function (dd, ii) {
          return ii & 1 ? 'start' : 'end';
        })
        .text(format)
        // .transition()
        // .duration(duration)
        .attr('y', x1);

      boxTick
        // .transition()
        // .duration(duration)
        .text(format)
        .attr('y', x1);

      // Update whisker ticks. These are handled separately from the box
      // ticks because they may or may not exist, and we want don't want
      // to join box ticks pre-transition with whisker ticks post-.
      const whiskerTick = g.selectAll('text.whisker')
        .data(whiskerData || []);

      whiskerTick.enter().append('text')
        .attr('class', 'whisker')
        .attr('dy', '.3em')
        .attr('dx', 6)
        .attr('x', widthV)
        .attr('y', x0)
        .text(format)
        .style('opacity', 1e-6)
        // .transition()
        // .duration(duration)
        .attr('y', x1)
        .style('opacity', 1);

      // whiskerTick.transition()
      //   .duration(duration)
      whiskerTick
        .text(format)
        .attr('y', x1)
        .style('opacity', 1);

      whiskerTick.exit()
        // .transition()
        // .duration(duration)
        .attr('y', x1)
        .style('opacity', 1e-6)
        .remove();
    });
    d3.timerFlush();
  }


  width(n: number): BoxPlot {
    this.width_v = n;
    return this;
  }

  height(n: number) {
    this.height_v = n;
    return this;
  }

  whiskers(fun: ((number) => number[])): BoxPlot {
    this.whiskers_v = fun;
    return this;
  }

  domain(n: number[]): BoxPlot {
    this.domain_v = n;
    return this;
  }


}
