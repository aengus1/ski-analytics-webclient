import {ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import * as fromLayout from '../shared/layout/reducers/layout.reducer';
import * as fromRouter from '@ngrx/router-store';
import {RouterStateUrl} from '../shared/utils';

export interface State {

  router: fromRouter.RouterReducerState<RouterStateUrl>;
  layout: fromLayout.State;
}



export const reducers: ActionReducerMap<State> = {
router: fromRouter.routerReducer,
  layout: fromLayout.reducer
};

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}


export const metaReducers: MetaReducer<State>[] = !environment.production ? [logger] : [];


/**
 * Layout Reducers
 */
export const getLayoutState = createFeatureSelector<fromLayout.State>('layout');

export const getNavbarCollapsed = createSelector(
  getLayoutState,
  fromLayout.getNavbarCollapsed
);


