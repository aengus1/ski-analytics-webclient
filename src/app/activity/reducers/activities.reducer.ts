import {ActivityActions, ActivityActionTypes, ActivitySidebarType} from '../actions/activity.actions';
import {Activity} from '../model/Activity_pb';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface State extends EntityState<Activity> {
 selectedActivityId: number | null;
  activitySport: Array<string>;
  activitySubSport: Array<string>;
  sidebarContent: ActivitySidebarType;
}

export const adapter: EntityAdapter<Activity> = createEntityAdapter<Activity>({
  selectId: (activity: Activity) => activity.getId(),
  sortComparer: false
});

export const initialState: State = adapter.getInitialState({
 selectedActivityId: null,
  activitySport: buildActivitySport(),
  activitySubSport: buildActivitySubSport(),
  sidebarContent: ActivitySidebarType.NoContent
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


export function reducer(state = initialState, action: ActivityActions): State {
  switch (action.type) {

    case ActivityActionTypes.Load: {
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


