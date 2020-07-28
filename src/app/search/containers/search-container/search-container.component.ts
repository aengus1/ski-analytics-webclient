import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import * as fromSearch from '../../reducers/';
import {select, Store} from '@ngrx/store';
import {SearchComponent} from '../../components/search/search.component';
import {ActivitySearchResult} from '../../../../generated/graphql';

@Component({
  selector: 'app-search-container',
  template: `<app-search-module
    [searchResults] = "searchResults$ | async"
    (messageEvent)="receiveMessage($event)">
  </app-search-module>`
})
export class SearchContainerComponent  implements OnInit {
  searchResults$: Observable<ActivitySearchResult[]>;
  @ViewChild(SearchComponent, { static: true }) searchModuleComponent;

  constructor(private store: Store<fromSearch.State>) {
    this.searchResults$ = store.pipe(select(fromSearch.selectSearchResults));

    this.searchResults$.subscribe(x => {
      console.log('received search results..: ' + x);
    });
  }


  receiveMessage($event) {
  }

  ngOnInit() {
    this.searchResults$.subscribe(x => {
      console.log('search result sub: ' + x[0].id);
    });
  }
}
