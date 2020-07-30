import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {ActivityFilterActionTypes, FilterActivity} from '../../activity/actions/activity-filter.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Apollo} from 'apollo-angular';
import {SearchActionTypes, SearchError, SearchRequest, SearchResponse} from '../actions/search.actions';
import {SearchService} from '../services/search.service';
import {ActivitySearchResult} from '../../../generated/graphql';
import {of} from 'rxjs';

@Injectable()
export class SearchEffects {

  constructor(private actions$: Actions, private searchService: SearchService) {

  }

  @Effect()
  searchResponse$  = this.actions$.pipe(
    ofType<SearchRequest>(SearchActionTypes.SearchRequest),
    switchMap( action => {
      return this.searchService.search(action.criteria, action.pagination, action.orderInfo).pipe(
        map((res: ActivitySearchResult[]) => new SearchResponse(res)),
        catchError(error => of(new SearchError(error)))
      );
    })
  );
    //
    // // map(p => {
    // //   console.log('p = ' + JSON.stringify(p));
    // //   this.searchService.search(p.criteria, p.pagination, p.orderInfo).subscribe(x => {
    // //     console.log('search service resp' + x);
    // //     return new SearchResponse(x);
    // //   });
    // }));


  // @Effect()
  // reSubscribeContainer  = this.actions$.pipe(
  //   ofType<FilterActivity>(ActivityFilterActionTypes.FilterActivity),
  //   map(p => {
  //     console.log(' in effect');
  //     return new FilterActivitySuccess();
  //   }));



}
