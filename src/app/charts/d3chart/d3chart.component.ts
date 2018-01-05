import {Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {D3, D3Service, Selection} from 'd3-ng2-service';


@Component({
  selector: 'app-d3chart',
  template: `<svg></svg>`
})
export abstract class D3chartComponent implements OnInit,OnChanges  {

  protected d3: D3;
  protected parentNativeElement: any;
  protected d3Svg: Selection<SVGSVGElement, any, null, undefined>;
  @Input() width = 120;
  @Input() height = 200;
  @Input() data: Array<any>;
  private chartCreated: Boolean = false;

  constructor(element: ElementRef, d3Service: D3Service) { // <-- pass the D3 Service into the constructor
    this.d3 = d3Service.getD3(); // <-- obtain the d3 object from the D3 Service
    this.parentNativeElement = element.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chartCreated) {
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
  public abstract createChart();

  public abstract updateChart();

}
