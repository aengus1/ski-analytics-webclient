import {Component, EventEmitter, Input, NO_ERRORS_SCHEMA, OnInit, Output} from '@angular/core';
import {ActivitySearchResult} from '../../../../generated/graphql';
import {MessageEvent} from '../../../shared/utils';
import {IntervalPipe} from '../../../shared/pipes/interval.pipe';

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

   sortCol: string;
   sortAsc = false;

  // propogate events..
  receiveEvent($event) {
    this.changeEvent.emit($event);
  }

  sort(column: string) {
    if (column === this.sortCol) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortCol = column;
      this.sortAsc = false;
    }

    // update route and refresh
  }
}
