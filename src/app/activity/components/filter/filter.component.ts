import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  TemplateRef, ViewChild
} from '@angular/core';
import {MessageEvent} from '../../../shared/utils';
import {FilterBase} from './filter-base';
import {FilterSpeedComponent} from '../filter-speed/filter-speed.component';
import {ActivityFilter} from '../../model/activity-filter.model';
import {Subject} from 'rxjs/Subject';


@Component({
  selector: 'app-filter',
  template: `
    <!--<div class="card" ng-class="{bg-success: active, bg-light: !active}">-->
    <div class="card">
      <div class="card-header" [ngClass]="{'bg-success': active}">
      <span class="switch">
        <input type="checkbox" class="switch" id="switch-id" checked (change)="toggleActive()">
        <label for="switch-id">{{active ? 'On' : 'Off'}}</label>
      </span>
        <button type="button"
                (click)="clear()"
                class="btn btn-sm btn-outline-danger float-right">
          clear
        </button>
        {{title}}
      </div>
      <div class="card-body">
        <ng-content></ng-content>
      </div>
    </div>`
})
export class FilterComponent implements OnInit, AfterContentInit {

  constructor() {
  }

  @Input()
  title: string;
  filterId: string;
  active = true;
  @ContentChild(forwardRef(() => FilterBase))
  content: FilterBase;


  @Output()
  changeEvent = new EventEmitter<MessageEvent<number | string>>();

  ngOnInit() {
  }


  ngAfterContentInit() {
    console.log('content ' + this.content);
    this.filterId = this.content.getFilterId();
  }

  clear() {
    this.content.reset();
    this.changeEvent.emit(new MessageEvent('clearFilter', this.filterId));
  }

  toggleActive() {
    this.active = !this.active;
    if (this.active) {
      this.changeEvent.emit(new MessageEvent<string>('enableFilter', this.filterId));
    } else {
      this.changeEvent.emit(new MessageEvent<string>('disableFilter', this.filterId));
    }
  }

  receiveMessage($event) {
    this.changeEvent.emit($event);
  }
}

