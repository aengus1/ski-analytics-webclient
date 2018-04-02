import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {D3DualRangeSliderComponent} from '../../../chart/components/d3-dual-range-slider/d3-dual-range-slider.component';
import {MessageEvent} from '../../../shared/utils';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'app-filter-speed',
  template: `
    <app-filter title="Speed">
      <app-d3-dual-range-slider
        #speedSlider
        [minimum]="0"
        [maximum]="activity.getSummary().getMaxspeed()"
        [width]="100"
        [unitLabel]="Km/h"
      >
      </app-d3-dual-range-slider>
    </app-filter>`
})

export class FilterSpeedComponent  implements  OnChanges, OnInit {

  @ViewChild(D3DualRangeSliderComponent) speedSlider;

  @Output()
  changeEvent = new EventEmitter<MessageEvent<number | boolean>>();

  @Input()
  reset = false;

  constructor() {
  }

  ngOnInit() {
  }
  ngOnChanges() {
    console.log('change detected');
    if (this.reset) {
      console.log('calling reset ');
      this.speedSlider.reset();
    }
  }

  receiveMessage($event) {
    switch ($event) {
      // TODO -> turn into a speed specific message
      case 'minValue': {
        this.changeEvent.emit(new MessageEvent('filterSpeedMin', $event.payload));
        this.changeEvent.emit(new MessageEvent('filterActive', true));
        return;
      }
      case 'maxValue': {
        this.changeEvent.emit(new MessageEvent('filterSpeedMax', $event.payload));
        this.changeEvent.emit(new MessageEvent('filterActive', true));
        return;
      }
    }
  }

}
