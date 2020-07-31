import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivitySearchResult} from '../../../../generated/graphql';
import {MessageEvent} from '../../../shared/utils';

@Component({
  selector: 'app-search-module',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  @Input()
  public searchResults: ActivitySearchResult[];

  @Output()
  public messageEvent: EventEmitter<MessageEvent<any>> = new EventEmitter<MessageEvent<any>>();


  // propogate events..
  receiveEvent($event) {
    this.messageEvent.emit($event);
  }

}
