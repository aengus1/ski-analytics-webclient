import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {D3BoxplotComponent} from './components/d3-boxplot/d3-boxplot.component';
import {D3ChartComponent} from './components/d3-chart/d3chart.component';
import {D3Service} from 'd3-ng2-service';
import {D3RangeSliderComponent} from './components/d3-range-slider/d3-range-slider.component';
import {D3DualRangeSliderComponent} from './components/d3-dual-range-slider/d3-dual-range-slider.component';
import {D3BarComponent} from './d3-bar/d3-bar.component';
import {LoggerService} from '../shared/services/logger.service';
import {D3RadialComponent} from './components/d3-radial/d3-radial.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [D3BoxplotComponent, D3ChartComponent, D3RangeSliderComponent, D3DualRangeSliderComponent,
    D3BarComponent, D3RadialComponent],
  providers: [D3Service, LoggerService],
  exports: [D3BoxplotComponent, D3RangeSliderComponent, D3DualRangeSliderComponent, D3BarComponent, D3RadialComponent]
})
export class ChartModule { }
