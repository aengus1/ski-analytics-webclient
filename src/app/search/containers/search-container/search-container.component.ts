import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import * as fromSearch from '../../reducers/';
import {select, Store} from '@ngrx/store';
import {SearchComponent} from '../../components/search/search.component';
import {ActivitySearchResult} from '../../../../generated/graphql';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-search-container',
  template: `<app-search-module
    [searchResults] = "searchResults$ | async"
    (messageEvent)="receiveMessage($event)">
  </app-search-module>`
})
export class SearchContainerComponent  {
  searchResults$: Observable<ActivitySearchResult[]>;
  @ViewChild(SearchComponent, { static: true }) searchModuleComponent;

  constructor(private store: Store<fromSearch.State>, private router: ActivatedRoute) {
    this.searchResults$ = store.pipe(select(fromSearch.selectSearchResults));

  }


  receiveMessage($event) {
    switch ($event.name) {
      case 'refresh' : {
        console.log('calling refresh from search container');
        // todo -> refresh page

      }

    }
  }

}