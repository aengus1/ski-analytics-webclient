import {Action} from '@ngrx/store';
import {ActivitySearchResult, Criteria, OrderInfo, PageInfo} from '../../../generated/graphql';

export enum SearchActionTypes {
  SearchRequest= '[Search] Search Request Activities',
  SearchResponse = '[Search] Search Response Activities',
  SearchError = '[Search] Search Error'
}

export class SearchRequest implements Action {

  readonly type = SearchActionTypes.SearchRequest;
  constructor(public criteria: Criteria[], public pagination: PageInfo, public orderInfo: OrderInfo) {}
}

export class SearchResponse implements Action {

  readonly type = SearchActionTypes.SearchResponse;
  constructor(public response: ActivitySearchResult[]) {}
}


export class SearchError implements Action {

  readonly type = SearchActionTypes.SearchError;
  constructor() {}
}



export type SearchActions = SearchRequest | SearchResponse | SearchError;
