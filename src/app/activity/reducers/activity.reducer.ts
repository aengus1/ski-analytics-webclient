import {
  ActivityActions,
  ActivityActionTypes,
  ActivitySidebarType, FilterSelectedActivity,
  LoadActivity,
  SelectActivity, SetSidebarContent
} from '../actions/activity.actions';
import {Activity} from '../model/activity/Activity_pb';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {
  ActivityFilterActions, ActivityFilterActionTypes
} from '../actions/activity-filter.actions';
import {ActivityFilter} from '../model/activity-filter/activity-filter.model';
import {Dictionary} from '@ngrx/entity/src/models';
import * as _ from 'lodash';


export interface State extends EntityState<Activity> {
 selectedActivityId: string | null;
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
export function buildActivitySport(): Array<string>  {
  const activitySport = new Array<string>();
  let i = 0;
  for (const v in Activity.Sport) {
  activitySport[i++] = v;
}
return activitySport;

}

export function buildActivitySubSport(): Array<string>  {
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
      const act: LoadActivity = <LoadActivity>action;
      return adapter.addOne(act.payload, {
        ...state,
        unfilteredActivity: act.payload
      });
    }

    case ActivityActionTypes.Select: {
      const act: SelectActivity = <SelectActivity>action;
      // update the selectedActivityId, and copy the payload into unfilteredActivity
      const newState = {
        ...state,
        selectedActivityId: act.payload,
        unfilteredActivity: act.payload != null ? deepCopyActivity(state.entities[act.payload]) : null,
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
    case ActivityActionTypes.SetSidebarContent: {
      const act: SetSidebarContent = <SetSidebarContent>action;
      return {
        ...state,
        sidebarContent: act.payload

      };
    }

    // filterActivity is called by an effect after the updateActivityFilter has completed
    // case ActivityFilterActionTypes.DeleteActivityFilter:
    case ActivityFilterActionTypes.FilterActivity: {
      // todo -> In this implementation there is no need to pass in the specific filter as all filters are re-applied
      const filters: Dictionary<ActivityFilter> = action.payload.allFilters;
      const activity: Activity = deepCopyActivity(state.unfilteredActivity);

       applyFilters(activity, filters);

      // replacing the entire activity entity will break the subscription in the component chain so just update values instead
      const entityReference = state.entities;
      entityReference[state.selectedActivityId].setValues(activity.getValues());

      return {
        ...state,
        entities: entityReference
      };
    }
    // this is dependant on the same function in the activity-filter reducer being called first, which is guaranteed by order
    // of reducers being added to the Store in activity.module
    case ActivityFilterActionTypes.AddActivityFilter: {
      const filters: Dictionary<ActivityFilter> = action.payload.allFilters;
      const activity: Activity = state.entities[state.selectedActivityId];

      applyFilters(activity, filters);
      const entityReference = state.entities;
      entityReference[state.selectedActivityId] = activity;
       return {
        ...state,
        entities: entityReference
      };
    }

    default: {
      return state;
    }
  }
}

/**
 * applies filter set to an activity
 * @param {Activity} activity
 * @param {Dictionary<ActivityFilter>} filters
 */
function applyFilters(activity: Activity, filters: Dictionary<ActivityFilter>) {
  _.forEach(filters, f => {
    try {
      f.applyFilter(activity);
    }catch (e) {
      console.error('[ActivityReducer] unable to apply filter ' + JSON.stringify(f) + ' to activity:' + activity.getId());
    }
  });
}

/**
 * deep copies an activity
 * @param {Activity} activity
 * @returns {Activity}
 */
 function deepCopyActivity(activity: Activity) {
   return _.cloneDeep(activity);
}


export const getSelectedActivityId = (state: State) => state.selectedActivityId;
export const getActivitySport = (state: State) => state.activitySport;
export const getActivitySubSport = (state: State) => state.activitySubSport;
export const getSidebarContents = (state: State) => state.sidebarContent;


