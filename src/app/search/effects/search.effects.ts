import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {ActivityFilterActionTypes, FilterActivity} from '../../activity/actions/activity-filter.actions';
import {map} from 'rxjs/operators';
import {Apollo} from 'apollo-angular';
import {SearchActionTypes, SearchRequest, SearchResponse} from '../actions/search.actions';
import {SearchService} from '../services/search.service';

@Injectable()
export class SearchEffects {

  constructor(private actions$: Actions, private searchService: SearchService) {

  }

  @Effect()
  updateFilter$  = this.actions$.pipe(
    ofType<SearchRequest>(SearchActionTypes.SearchRequest),
    map(p => {
      return new SearchResponse(this.searchService.search(p.criteria, p.pagination, p.orderInfo));
    }));


  // @Effect()
  // reSubscribeContainer  = this.actions$.pipe(
  //   ofType<FilterActivity>(ActivityFilterActionTypes.FilterActivity),
  //   map(p => {
  //     console.log(' in effect');
  //     return new FilterActivitySuccess();
  //   }));



}
