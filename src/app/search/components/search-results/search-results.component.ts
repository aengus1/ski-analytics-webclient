import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivitySearchResult} from '../../../../generated/graphql';
import {MessageEvent} from '../../../shared/utils';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent {

  @Input()
  public searchResults: ActivitySearchResult[];

  @Output()
  public changeEvent: EventEmitter<MessageEvent<any>> = new EventEmitter<MessageEvent<any>>();

  // propogate events..
  receiveEvent($event) {
    this.changeEvent.emit($event);
  }

}
