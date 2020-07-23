import {
  SearchActions,
  SearchActionTypes,
  Search
} from '../actions/search.actions';

import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {SearchService} from '../services/search.service';
import {ActivitySearchResult} from '../../../generated/graphql';


export interface State extends EntityState<Search> {
  searchResults: Array<ActivitySearchResult>;
}

export const adapter: EntityAdapter<Search> = createEntityAdapter<Search>({
  sortComparer: false
});

export const initialState: State = adapter.getInitialState({
  searchResults: new Array<ActivitySearchResult>()
});


export function reducer(state = initialState, action: SearchActions): State {

  switch (action.type) {

    case SearchActionTypes.Search: {
      const query: Search = <Search>action;
      const results = SearchService.search(query.criteria, query.pagination, query.orderInfo);
      return {
        ...state,
        searchResults: results
      };
    }
  }
}

export const getSearchResults = (state: State) => state.searchResults;

