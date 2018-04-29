import {
  AfterContentInit,
  Component,
  ContentChild,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {MessageEvent} from '../../../shared/utils';
import {FilterBase} from './filter-base.model';


@Component({
  selector: 'app-filter',
  template: `
    <!--<div class="card" ng-class="{bg-success: active, bg-light: !active}">-->
    <div class="card">
      <div class="card-header" [ngClass]="{'bg-success': active}">
      <span class="switch">
        <input type="checkbox" class="switch" id="switch-id"  (change)="toggleActive()">
        <label for="switch-id">{{active ? 'On' : 'Off'}}</label>
      </span>
        <button type="button"
                (click)="clear()"
                class="btn btn-sm btn-outline-danger float-right"
                [disabled]="!active">
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
  active = false;
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

