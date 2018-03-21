import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import * as activityReducer from '../activity/reducers';
import { environment } from '../../environments/environment';

export interface State {

}

export const reducers: ActionReducerMap<State> = {
 activity: activityReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
