import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromActivity from '../../../activity/reducers/activity.reducer';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import * as fromSearch from '../../reducers/search.reducer';
import * as activity from '../../../activity/actions/activity.actions';
import * as search from '../../actions/search.actions';

@Component({
  selector: 'app-view-search-result',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<app-search-container></app-search-container>`
})
export class ViewSearchResultComponent implements OnDestroy {

  actionsSubscription: Subscription;

  constructor(store: Store<fromSearch.State>, route: ActivatedRoute) {
    this.actionsSubscription = route.queryParams
      .pipe(map(params => {
          console.log('view search results params = ' + JSON.stringify(params));
          return new search.SearchRequest(params.criteria, params.pagination, params.order);
        }
      ))
      .subscribe(store);
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();

  }

}
