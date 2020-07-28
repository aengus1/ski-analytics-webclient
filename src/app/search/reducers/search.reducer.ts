import {SearchResponse, SearchRequest, SearchActions, SearchActionTypes} from '../actions/search.actions';

import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {SearchService} from '../services/search.service';
import {ActivitySearchResult} from '../../../generated/graphql';


export interface State extends EntityState<SearchResponse> {
  searchResults: Array<ActivitySearchResult>;
}

export const adapter: EntityAdapter<SearchResponse> = createEntityAdapter<SearchResponse>({
  sortComparer: false
});

export const initialState: State = adapter.getInitialState({
  searchResults: new Array<ActivitySearchResult>()
});


export function reducer(state = initialState, action: SearchActions): State {

  console.log('reducer called with ' + action.type);
  switch (action.type) {

    // case SearchActionTypes.SearchRequest: {
    //   const query: Search = <Search>action;
    //   const results =   SearchService.search(query.criteria, query.pagination, query.orderInfo);
    //   return {
    //     ...state,
    //     searchResults: results
    //   };
    // },
    case SearchActionTypes.SearchResponse: {
      console.log('action response = ' + action.response[0].id);
      return {
        ...state,
        searchResults: action.response
      };
    }
    default: {
      return state;
    }
  }
}

export const getSearchResults = (state: State) => state.searchResults;

