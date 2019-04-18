import {AfterViewInit, Component, ContentChild, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {MessageEvent} from '../../../shared/utils';
import {FilterBase} from './filter-base.model';
import {ActivityFilter} from '../../model/activity-filter/activity-filter.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-filter',
  template: `
    <div class="card">
      <div class="card-header" [ngClass]="{'success': active}">
        <form class="form-inline">
        <label class="switch float-left">
          <input type="checkbox" id="switch-id"  (change)="toggleActive()" [checked]="active">
          <span class="slider round"></span>
        </label>
        <span class="font-weight-normal"> {{title}}&nbsp;&nbsp; </span>
          <button type="button"
                  (click)="clear()"
                  class="btn btn-sm btn-outline-danger float-right"
                  [disabled]="!active">
            clear
          </button>
        </form>
      </div>
      <div class="card-body">
        <ng-content></ng-content>
      </div>
    </div>`,
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements AfterViewInit {

  constructor() {
  }

  @Input()
  title: string;
  @Input()
  filters: ActivityFilter[];
  filterId: string;
  active = false;
  @ContentChild(forwardRef(() => FilterBase))
  content: FilterBase;


  @Output()
  changeEvent = new EventEmitter<MessageEvent<number | string>>();

  ngAfterViewInit() {
    this.filterId = this.content.getFilterId();
    if ( _.map(this.filters, f => f.id).includes(this.filterId)) {
      this.active = true;
       this.content.set(_.find(this.filters, f => f.id === this.filterId));
    }
  }

  clear() {
    this.content.reset();
    this.changeEvent.emit(new MessageEvent('clearFilter', this.content.getFilterId()));
  }

  toggleActive() {
    this.active = !this.active;
    if (this.active) {
      // this.changeEvent.emit(new MessageEvent<string>('enableFilter', this.filterId));
      console.log('enabling filter');
      this.content.enable();
    } else {
      // this.changeEvent.emit(new MessageEvent<string>('disableFilter', this.filterId));
      this.content.disable();
    }
  }

  receiveMessage($event) {
    this.changeEvent.emit($event);
  }
}

