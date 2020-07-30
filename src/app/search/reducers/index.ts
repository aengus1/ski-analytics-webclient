import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromSearch from './search.reducer';
import * as fromRoot from '../../reducers';
import * as fromLayout from '../../shared/layout/reducers/layout.reducer';



export interface SearchState {
  search: fromSearch.State;
  error: any;
}
export const reducers: ActionReducerMap<SearchState> = {
  search: fromSearch.reducer,
  error: null
};


export interface State extends fromRoot.State {
  search: SearchState;
}


/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
export const getSearchState = createFeatureSelector<SearchState>('search');

export const getLayoutState = createFeatureSelector<fromLayout.State>('layout');

export const getSearchEntitiesState = createSelector(
  getSearchState,
  state => state.search
);

// export const selectSearchResults =  (state: SearchState) => state.search.searchResults;

export const selectSearchResults = createSelector(
  getSearchEntitiesState,
  state => state.searchResults
);




