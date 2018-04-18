import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Activity} from '../../model/activity/Activity_pb';

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
  private filterCount = 0;
  constructor() { }

  ngOnInit() {
  }

  receiveMessage($event) {
    console.log($event.name);
    switch ($event.name) {
    case 'enableFilter' : {
      this.filterCount++;
      this.changeEvent.emit($event);
      return;
    }
      case 'disableFilter': {
        if (this.filterCount > 0 ) {
          this.filterCount--;
        }
        this.changeEvent.emit($event);
        return;
      }
      default: {
        this.changeEvent.emit($event);
      }
    }
  }
}
