import {ActivityActions, ActivityActionTypes, ActivitySidebarType} from '../actions/activity.actions';
import {Activity} from '../model/Activity_pb';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import {ActivityFilterActions, ActivityFilterActionTypes} from '../actions/activity-filter.actions';
import * as fromFilters from './activity-filter.reducer';
import {ActivityFilter} from '../model/activity-filter.model';


export interface State extends EntityState<Activity> {
 selectedActivityId: number | null;
  activitySport: Array<string>;
  activitySubSport: Array<string>;
  sidebarContent: ActivitySidebarType;
  unfilteredActivity: Activity;
}

export const adapter: EntityAdapter<Activity> = createEntityAdapter<Activity>({
  selectId: (activity: Activity) => activity.getId(),
  sortComparer: false
});

export const initialState: State = adapter.getInitialState({
 selectedActivityId: null,
  activitySport: buildActivitySport(),
  activitySubSport: buildActivitySubSport(),
  sidebarContent: ActivitySidebarType.NoContent,
  unfilteredActivity: null
});


/**
* initializers to reverse activity sport enum (protobuf doesn't provide this out of the box
 */
function buildActivitySport(): Array<string>  {
  const activitySport = new Array<string>();
  let i = 0;
  for (const v in Activity.Sport) {
  activitySport[i++] = v;
}
return activitySport;

}

function buildActivitySubSport(): Array<string>  {
  const activitySubSport = new Array<string>();
let i = 0;
for (const v in Activity.SubSport) {
  activitySubSport[i++] = v;
}
return activitySubSport;

}


export function reducer(state = initialState, action: ActivityActions | ActivityFilterActions): State {
  switch (action.type) {

    case ActivityActionTypes.Load: {
      return adapter.addOne(action.payload, {
        ...state,
        selectedActivityId: state.selectedActivityId,
        unfilteredActivity: action.payload
      });
    }

    case ActivityActionTypes.Select: {

      const newState = {
        ...state,
        selectedActivityId: action.payload,
        unfilteredActivity: state.entities[action.payload],
      };

      if (state.selectedActivityId !== null) {
        const entityReference = state.entities;
        entityReference[state.selectedActivityId] = state.unfilteredActivity;
        return {
          ...newState,
          entities: entityReference
        };
      } else {
        return newState;
      }
    }
    // TODO -> confirm that activity filter actions will be handled first, this code relies on the filter collection
    // being updated first
    case ActivityActionTypes.FilterSelectedActivity:
    case ActivityFilterActionTypes.AddActivityFilter:
    case ActivityFilterActionTypes.DeleteActivityFilter:
    case ActivityFilterActionTypes.UpdateActivityFilter:
    case ActivityFilterActionTypes.ClearActivityFilters:
    {
      const filters: ActivityFilter[] = fromFilters.getAllActivityFilters(fromFilters.getActivityFiltersEntitiesState);
      // reset selected activity to unfiltered state
      const entityReference = state.entities;
      entityReference[state.selectedActivityId] = state.unfilteredActivity;
      // re apply all filters
      // TODO ->  implement this in a more efficient manner (see notes)
      filters.forEach(f => f.applyFilter(entityReference[state.selectedActivityId]));
      return {
        ...state,
        entities: entityReference
      };
    }

    case ActivityActionTypes.SetSidebarContent: {
      return {
        ...state,
        sidebarContent: action.payload

      };
    }
    default:
      return state;
  }
}

export const getSelectedActivityId = (state: State) => state.selectedActivityId;
export const getActivitySport = (state: State) => state.activitySport;
export const getActivitySubSport = (state: State) => state.activitySubSport;
export const getSidebarContents = (state: State) => state.sidebarContent;


