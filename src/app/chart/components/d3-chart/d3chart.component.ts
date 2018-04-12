import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {D3, D3Service, Selection} from 'd3-ng2-service';


// this is an abstract component.  Compiler is complaining that abstract components are not allowed to be
// registered in app.module.  This may be a bug in angular - once fixed, mark this class as abstract, as well as the
// updateChart and createChart methods
@Component({
  selector: 'app-d3chart',
  template: `<svg></svg>`
})
export  class D3ChartComponent implements OnInit, OnChanges  {

  protected d3: D3;
  protected parentNativeElement: any;
  protected d3Svg: Selection<SVGSVGElement, any, null, undefined>;
  @Input() width = 120;
  @Input() height = 200;
  @Input() data: Array<Number>;
  private chartCreated: Boolean = false;

  constructor(element: ElementRef, d3Service: D3Service) { // <-- pass the D3 Service into the constructor
    this.d3 = d3Service.getD3(); // <-- obtain the d3 object from the D3 Service
    this.parentNativeElement = element.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {

    // data input is subject to change from filters being applied or async loading from http.
    if (this.chartCreated && changes['data']) {
      this.updateChart();
    }
  }

  ngOnInit(): void {
    this.d3Svg =  this.d3.select(this.parentNativeElement).select<SVGSVGElement>('svg');
    this.createChart();

    this.chartCreated = true;
    if (this.data) {
      this.updateChart();
    }
  }
  public  createChart() {}

  public  updateChart() {}

}
