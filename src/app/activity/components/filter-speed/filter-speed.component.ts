import {Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {D3DualRangeSliderComponent} from '../../../chart/components/d3-dual-range-slider/d3-dual-range-slider.component';
import {MessageEvent} from '../../../shared/utils';
import {SpeedFilter} from './speed-filter';
import {Activity} from '../../model/Activity_pb';
import {ActivityFilter} from '../../model/activity-filter.model';
import {FilterBase} from '../filter/filter-base';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

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
  changeEvent = new EventEmitter<MessageEvent<any[]| ActivityFilter | string>>();
  @Input()
  private activity: Activity;
  private filterId: string;
  private debouncer: Subject<MessageEvent<any[]| ActivityFilter>> = new Subject<MessageEvent<any[]| ActivityFilter>>();
  private _min: number;
  private _max: number;
  constructor() {
    super();
  }

  ngOnInit() {
    this._min = 0;
    this._max = this.activity.getSummary().getMaxspeed();
  }

  reset () {
    console.log('reset called');
    this.speedSlider.clear();
  }

  getFilterId() {
    return this.filterId;
  }

  enable() {
    const speedFilter = new SpeedFilter(0, this.activity.getSummary().getMaxspeed(), 'speed');
    speedFilter._min = this._min;
    speedFilter._max = this._max;
    this.changeEvent.emit(new MessageEvent('addActivityFilter', speedFilter));
    this.filterId = speedFilter.id;
    this.debouncer.debounceTime(200).subscribe(v => {
      this.changeEvent.emit(v);
    });
  }

  disable() {
    this._min = 0;
    this._max = this.activity.getSummary().getMaxspeed();
    this.changeEvent.emit(new MessageEvent('removeActivityFilter', this.filterId));
  }

  receiveMessage($event) {
    switch ($event.name) {
      case 'minValue': {
        this._min = $event.payload;
        this.debouncer.next(new MessageEvent('filterMin', [this.filterId, $event.payload]));
        return;
      }
      case 'maxValue': {
        this._max = $event.payload;
        this.debouncer.next(new MessageEvent('filterMax', [this.filterId, $event.payload]));
        return;
      }
    }
  }

}