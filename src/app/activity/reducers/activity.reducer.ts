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
  console.log('hit activity reducer with ' + action.type);
  switch (action.type) {

    case ActivityActionTypes.Load: {
      const act: LoadActivity = <LoadActivity>action;
      return adapter.addOne(act.payload, {
        ...state,
        selectedActivityId: state.selectedActivityId,
        unfilteredActivity: act.payload
      });
    }

    case ActivityActionTypes.Select: {
      const act: SelectActivity = <SelectActivity>action;
      const newState = {
        ...state,
        selectedActivityId: act.payload,
        unfilteredActivity: deepCopyActivity(state.entities[act.payload]),
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
    // case ActivityFilterActionTypes.DeleteActivityFilter:
    // case ActivityFilterActionTypes.ClearActivityFilter:
    // case ActivityFilterActionTypes.UpdateActivityFilter: {
    case ActivityFilterActionTypes.FilterActivity: {
      console.log(' in filter activity.. ');
      //todo -> NO NEED TO PASS IN SPECIFIC FILTER HERE
      const filters: Dictionary<ActivityFilter> = action.payload.allFilters;
       let activity: Activity = deepCopyActivity(state.unfilteredActivity);
      console.log('pre ' + state.unfilteredActivity.getValues().getSpeedList().length + ' vs ' + activity.getValues().getSpeedList().length);
      for (const key in filters) {
        const f: ActivityFilter = filters[key];
        try {
          activity = f.applyFilter(activity)[0];
        }catch (e) {
          console.log('error' + e);
        }
      }
      console.log(state.unfilteredActivity.getValues().getSpeedList().length + ' vs ' + activity.getValues().getSpeedList().length);
      console.log(activity.getValues().getSpeedList());
      console.log('reducer min: ' + Math.min.apply(null, activity.getValues().getSpeedList()) + ' max ' + Math.max.apply(null, activity.getValues().getSpeedList()));
      const entityReference = state.entities;
      // replacing the entire activity entity will break the subscription in the component chain
      // instead just update the values
      entityReference[state.selectedActivityId].setValues(activity.getValues());
      return {
        ...state,
        entities: entityReference
      };
    }
    // TODO -> go through effect as above.
    // todo -> code duplication with above?
    case ActivityFilterActionTypes.AddActivityFilter: {
      const filters: Dictionary<ActivityFilter> = action.payload.allFilters;
      let activity: Activity = state.entities[state.selectedActivityId];

      for (const key in filters) {
        const f: ActivityFilter = filters[key];
        try {
            activity = f.applyFilter(activity)[0];
        }catch (e) {
          console.log('error' + e);
        }
      }
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


 function deepCopyActivity(activity: Activity) {
   return _.cloneDeep(activity);
}


export const getSelectedActivityId = (state: State) => state.selectedActivityId;
export const getActivitySport = (state: State) => state.activitySport;
export const getActivitySubSport = (state: State) => state.activitySubSport;
export const getSidebarContents = (state: State) => state.sidebarContent;


