import {Action} from '@ngrx/store';
import {Criteria, OrderInfo, PageInfo} from '../../../generated/graphql';

export enum SearchActionTypes {
  Search= '[Search] Search Activities'

}

export class Search implements Action {

  readonly type = SearchActionTypes.Search;
  constructor(public criteria: Criteria[], public pagination: PageInfo, public orderInfo: OrderInfo) {}
}

export type SearchActions = Search;
