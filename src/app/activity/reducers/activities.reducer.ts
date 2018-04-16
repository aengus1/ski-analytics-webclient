import {
  ActivityActions,
  ActivityActionTypes,
  ActivitySidebarType, FilterSelectedActivity,
  LoadActivity,
  SelectActivity, SetSidebarContent
} from '../actions/activity.actions';
import {Activity} from '../model/Activity_pb';
import {createEntityAdapter, EntityAdapter, EntityState, Update} from '@ngrx/entity';
import {ActivityFilterActions, ActivityFilterActionTypes, AddActivityFilter} from '../actions/activity-filter.actions';
import {ActivityFilter} from '../model/activity-filter.model';
import * as fromFilters from './activity-filter.reducer';
import {getSelectedActivity} from './index';
import {AbstractActivityFilter} from '../components/filter/AbstractActivityFilter';
import {Dictionary} from '@ngrx/entity/src/models';


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
  console.log('hit activity reducer');
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
        unfilteredActivity: state.entities[act.payload],
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
     case ActivityActionTypes.FilterSelectedActivity:
    case ActivityFilterActionTypes.AddActivityFilter:
    case ActivityFilterActionTypes.DeleteActivityFilter:
    case ActivityFilterActionTypes.ClearActivityFilter:
    case ActivityFilterActionTypes.UpdateActivityFilter: {
      const act: FilterSelectedActivity = <FilterSelectedActivity>action;
      const filters: Dictionary<ActivityFilter> = act.payload.allFilters;
      let activity: Activity = state.entities[state.selectedActivityId];


      for (const key in filters) {
        const f: ActivityFilter = filters[key];
        try {
            activity = f.applyFilter(activity)[0];
        }catch (e) {
          console.log('error' + e);
          // console.log('attempting to applyFilter on ' + JSON.stringify(f));
          // console.log('activity' + JSON.stringify(activity));
        }
      }
      console.log('min = ' + Math.min.apply(null, activity.getValues().getSpeedList()));
      console.log('max = ' + Math.max.apply(null, activity.getValues().getSpeedList()));
      const entityReference = state.entities;
      entityReference[state.selectedActivityId] = activity;
      // console.log('min = ' + Math.min.apply(null, entityReference[state.selectedActivityId].getValues().getSpeedList()));
      // console.log('max = ' + Math.max.apply(null, entityReference[state.selectedActivityId].getValues().getSpeedList()));
       return {
        ...state,
        entities: entityReference
      };
    }
    // case ActivityFilterActionTypes.ClearActivityFilter: {
    //   return adapter.removeOne(adapter.getSelectors().selectAll(state)
    //     .filter( f => f.type === action.payload.type)
    //     [0].id, state);
    // }

    default: {
      return state;
    }
  }
}


export const getSelectedActivityId = (state: State) => state.selectedActivityId;
export const getActivitySport = (state: State) => state.activitySport;
export const getActivitySubSport = (state: State) => state.activitySubSport;
export const getSidebarContents = (state: State) => state.sidebarContent;


