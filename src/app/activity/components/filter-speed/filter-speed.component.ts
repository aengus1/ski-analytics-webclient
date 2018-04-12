import {Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {D3DualRangeSliderComponent} from '../../../chart/components/d3-dual-range-slider/d3-dual-range-slider.component';
import {MessageEvent} from '../../../shared/utils';
import {Subscription} from 'rxjs/Subscription';
import {SpeedFilter} from './SpeedFilter';
import {Activity} from '../../model/Activity_pb';
import {ActivityFilter} from '../../model/activity-filter.model';
import {FilterBase} from '../filter/filter-base';


@Component({
  selector: 'app-filter-speed',
  template: `<app-d3-dual-range-slider
        #speedSlider
        [minimum]="0"
        [maximum]="activity.getSummary().getMaxspeed()"
        [width]="100"
        [unitLabel]="'km/h'"
        (changeEvent)="receiveMessage($event)"
      ></app-d3-dual-range-slider>`,
    providers: [{provide: FilterBase, useExisting: forwardRef(() => FilterSpeedComponent)}]
})
export class FilterSpeedComponent extends FilterBase implements  OnInit {

  @ViewChild(D3DualRangeSliderComponent) speedSlider;

  @Output()
  changeEvent = new EventEmitter<MessageEvent<any[]| ActivityFilter>>();
  @Input()
  private activity: Activity;
  private filterId: string;

  constructor() {
    super();
  }

  ngOnInit() {
    const speedFilter = new SpeedFilter(0, this.activity.getSummary().getMaxspeed());
    this.changeEvent.emit(new MessageEvent('addActivityFilter', speedFilter));
    this.filterId = speedFilter.id;

  }

  reset () {
    console.log('reset called');
    this.speedSlider.clear();
  }

  getFilterId() {
    return this.filterId;
  }

  receiveMessage($event) {
    // TODO -> NEED to debounce this, or figure out if there is a circular call to update
    switch ($event.name) {
      case 'minValue': {
        this.changeEvent.emit(new MessageEvent('filterMin', [this.filterId, $event.payload]));
        return;
      }
      case 'maxValue': {
        console.log('emitting: ' + [this.filterId, $event.payload]);
        this.changeEvent.emit(new MessageEvent('filterMax', [this.filterId, $event.payload]));
        return;
      }
    }
  }

}
