import { Action } from '@ngrx/store';
import {ActivityActions, ActivityActionTypes, SelectActivity} from '../actions/activity.actions';
import {Activity} from '../model/Activity_pb';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface State extends EntityState<Activity> {
 selectedActivityId: number | null;
}

export const adapter: EntityAdapter<Activity> = createEntityAdapter<Activity>({
  selectId: (activity: Activity) => activity.getId(),
  sortComparer: false
});

export const initialState: State = adapter.getInitialState({
 selectedActivityId: null
});

export function reducer(state = initialState, action: ActivityActions): State {
  switch (action.type) {

    case ActivityActionTypes.Load: {
      console.log('load activity called with ' + action.payload);
      return adapter.addOne(action.payload, {
        ...state,
        selectedActivityId: state.selectedActivityId
      });
    }

    case ActivityActionTypes.Select: {
      return {
        ...state,
        selectedActivityId: action.payload
      };
    }
    default:
      return state;
  }
}

export const getSelectedActivityId = (state: State) => state.selectedActivityId;


