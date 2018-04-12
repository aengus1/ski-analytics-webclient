import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FilterComponent} from '../filter/filter.component';
import {Activity} from '../../model/Activity_pb';

import {MessageEvent} from '../../../shared/utils';

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.css']
})
export class FilterListComponent implements OnInit {


  @Input()
  filterOpen: boolean;
  @Input()
  private activity: Activity;
  @Output()
  changeEvent = new EventEmitter<MessageEvent<number | string>>();

  constructor() { }

  ngOnInit() {
  }

  receiveMessage($event) {
    console.log('fl RECEIVED EVENT: ' + $event.name + ' ' + $event.payload);
    this.changeEvent.emit($event);
  }
}
