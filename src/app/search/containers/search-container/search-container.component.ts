import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';

import {select, Store} from '@ngrx/store';
import {SearchComponent} from '../../components/search/search.component';
import {ActivitySearchResult} from '../../../../generated/graphql';

@Component({
  selector: 'app-search-container',
  template: `<app-search-module
    [searchResults] = "searchResults$ | async"
    (messageEvent)="receiveMessage($event)">
  </app-search-module>`,
  styleUrls: ['./search-container.component.scss']
})
export class SearchContainerComponent  {
  searchResults$: Observable<ActivitySearchResult[]>;
  @ViewChild(SearchComponent, { static: true }) searchModuleComponent;

  constructor(private store: Store<fromSearch.State>) {
    this.searchResults$ = store.pipe(select(fromSearch.getSearchResults));
  }


  receiveMessage($event) {
  }
}
