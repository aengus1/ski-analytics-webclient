import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {D3BoxplotComponent} from './components/d3-boxplot/d3-boxplot.component';
import {D3ChartComponent} from './components/d3-chart/d3chart.component';
import {D3Service} from 'd3-ng2-service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [D3BoxplotComponent, D3ChartComponent],
  providers: [D3Service],
  exports: [D3BoxplotComponent]
})
export class ChartModule { }
