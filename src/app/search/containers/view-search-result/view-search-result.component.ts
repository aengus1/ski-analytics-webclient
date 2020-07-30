import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromActivity from '../../../activity/reducers/activity.reducer';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import * as fromSearch from '../../reducers/search.reducer';
import * as activity from '../../../activity/actions/activity.actions';
import * as search from '../../actions/search.actions';
import {Criteria, OrderInfo, PageInfo} from '../../../../generated/graphql';

@Component({
  selector: 'app-view-search-result',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<app-search-container></app-search-container>`
})
export class ViewSearchResultComponent implements OnDestroy {

  actionsSubscription: Subscription;

  constructor(store: Store<fromSearch.State>, route: ActivatedRoute) {
    this.actionsSubscription = route.paramMap
      .pipe(map(paramMap => {
          // console.log('view search results params = ' + JSON.stringify(paramMap));
          // console.log(paramMap.get('criteria'));
          const predicates: Criteria[] = JSON.parse(paramMap.get('criteria'));
          const pagination: PageInfo = JSON.parse(paramMap.get('pagination'));
          const order: OrderInfo = JSON.parse(paramMap.get('order'));
          return new search.SearchRequest(predicates, pagination, order);
        }
      ))
      .subscribe(store);
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();

  }

}
