import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {D3BoxplotComponent} from './components/d3-boxplot/d3-boxplot.component';
import {D3ChartComponent} from './components/d3-chart/d3chart.component';
import {D3Service} from 'd3-ng2-service';
import { D3RangeSliderComponent } from './components/d3-range-slider/d3-range-slider.component';
import { D3DualRangeSliderComponent } from './components/d3-dual-range-slider/d3-dual-range-slider.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [D3BoxplotComponent, D3ChartComponent, D3RangeSliderComponent, D3DualRangeSliderComponent],
  providers: [D3Service],
  exports: [D3BoxplotComponent, D3RangeSliderComponent, D3DualRangeSliderComponent]
})
export class ChartModule { }
