import {
  ActivityActions,
  ActivityActionTypes,
  ActivitySidebarType,
  LoadActivity,
  SelectActivity,
  SetSidebarContent
} from '../actions/activity.actions';
import {Activity} from '../model/activity/Activity_pb';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {ActivityFilterActions, ActivityFilterActionTypes} from '../actions/activity-filter.actions';
import {ActivityFilter} from '../model/activity-filter/activity-filter.model';
import {Dictionary} from '@ngrx/entity/src/models';
import * as _ from 'lodash';
import {ActivitySummaryService} from '../services/activity-summary-service/activity-summary.service';
import {AbstractActivityFilter} from '../components/filter/abstract-activity-filter';

export interface State extends EntityState<Activity> {
 selectedActivityId: string | null;
  activitySport: Array<string>;
  activitySubSport: Array<string>;
  sidebarContent: ActivitySidebarType;
  unfilteredActivity: Activity;
  filteredIndices: number[];
  tsLookup: Map<string, number>;
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
  unfilteredActivity: new Activity(),
  filteredIndices: [],
  tsLookup: null
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

export function buildTsLookupMap(activity: Activity): Map<string, number> {
  const result: Map<string, number> = new Map<string, number>();
  activity.getValues().getTsList().forEach( (v, i) => result.set(v, i));
  return result;
}


export function reducer(state = initialState, action: ActivityActions | ActivityFilterActions): State {

  switch (action.type) {

    case ActivityActionTypes.Load: {
      const act: LoadActivity = <LoadActivity>action;
      const tsLookup: Map<string, number> = buildTsLookupMap(act.payload);
      ActivitySummaryService.summarizeActivity(act.payload, null, act.payload, tsLookup );
      // const unfilteredRef = state.unfilteredActivity;
      // setActivityContents(act.payload, unfilteredRef);
      // const newState = { ...state, unfilteredActivity: unfilteredRef };
      // return adapter.addOne(act.payload, newState);
      return adapter.addOne(act.payload, {
        ...state,
        unfilteredActivity: act.payload,
        tsLookup: tsLookup,
        filteredIndices: []
      });
    }

    case ActivityActionTypes.Select: {
      const act: SelectActivity = <SelectActivity>action;
      // update the selectedActivityId, and copy the payload into unfilteredActivity
      // const unfilteredRef = state.unfilteredActivity;
      // if (act.payload !== null) {
      //   setActivityContents(deepCopyActivity(state.entities[act.payload]), unfilteredRef);
      // } else {
      //   setActivityContents(new Activity(), unfilteredRef);
      // }
      const newState = {
        ...state,
        selectedActivityId: act.payload,
        unfilteredActivity:  act.payload != null ? deepCopyActivity(state.entities[act.payload]) : null
      };
      // unfilteredActivity: act.payload != null ? deepCopyActivity(state.entities[act.payload]) : null,
      ActivitySummaryService.summarizeActivity(state.unfilteredActivity, null, newState.unfilteredActivity,
        newState.tsLookup);

      if (state.selectedActivityId !== null) {
        const entityReference = state.entities;
        entityReference[state.selectedActivityId] = state.unfilteredActivity;
        return {
          ...newState,
          entities: entityReference,
          tsLookup: buildTsLookupMap(state.entities[act.payload])
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
      let filteredSet = null;
      if (Object.keys(filters).length > 0) {
           filteredSet = applyFilters(activity, filters);
          // console.log(' n filters = ' + Object.keys(filters).length);
        }
        //TODO -> optimize this all set creation. Do we really need to do it every time?
      const allSet = Array.from({length: state.unfilteredActivity.getValues().getTsList().length}, (v, k) => k + 1);
      state.filteredIndices = _.difference(allSet, filteredSet);
      ActivitySummaryService.summarizeActivity(activity, Object.keys(filters).length > 0 ? filteredSet : null,
        state.unfilteredActivity, state.tsLookup);
      // replacing the entire activity entity will break the subscription in the component chain so just update values instead
      const entityReference = state.entities;
      setActivityContents(activity, entityReference[state.selectedActivityId]);
      // entityReference[state.selectedActivityId].setValues(activity.getValues());
      // entityReference[state.selectedActivityId].setSummary(activity.getSummary());

      return {
        ...state,
        entities: entityReference
      };
    }
    // this is dependant on the same function in the activity-filter reducer being called first, which is guaranteed by order
    // of reducers being added to the Store in activity.module
    case ActivityFilterActionTypes.AddActivityFilter: {
      const filters: Dictionary<ActivityFilter> = action.payload.allFilters;
      // console.log('all filters: ' + JSON.stringify(filters));
      const newFilter: ActivityFilter = action.payload.activityFilter;
      filters[newFilter.id] = newFilter; // add new activity filter to dictionary so it will be applied here
      const activity: Activity = state.entities[state.selectedActivityId];
      let filteredSet = null;
      if (Object.keys(filters).length > 0) {
        filteredSet = applyFilters(activity, filters);
        // console.log(' n filters = ' + Object.keys(filters).length);
      }
      const allSet = Array.from({length: state.unfilteredActivity.getValues().getTsList().length}, (v, k) => k + 1);
      state.filteredIndices = _.difference(allSet, filteredSet);
      ActivitySummaryService.summarizeActivity(activity, Object.keys(filters).length > 0 ? filteredSet : null,
        state.unfilteredActivity, state.tsLookup);
      const entityReference = state.entities;
      setActivityContents(activity, entityReference[state.selectedActivityId]);
      // entityReference[state.selectedActivityId] = activity;
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
 * applies filter set to an activity.
 * @param {Activity} activity
 * @param {Dictionary<ActivityFilter>} filters
 * @returns {number[]} value ids remaining
 */
function applyFilters(activity: Activity, filters: Dictionary<ActivityFilter>): number[] {

  let idSet: number[] = []; // new Set<number>();
  let values: number[] = [];

  _.forEach(filters, f => {
    try {
     values = f.findRemainingIndices(activity);
     console.log(f.id + ' values = ' + values);
    }catch (e) {
      console.error('[ActivityReducer] unable to apply filter ' + JSON.stringify(f) + ' to activity:' + activity.getId());
    }
    if (idSet.length === 0) {
      values.forEach(x  => idSet.push(x));
    } else {
      // do intersection here
      idSet = _.intersection(values, idSet);
    }
  });
AbstractActivityFilter.filterAllValuesByIndex(activity, idSet);
return idSet;
}

/**
 * deep copies an activity
 * @param {Activity} activity
 * @returns {Activity}
 */
 function deepCopyActivity(activity: Activity) {
   return _.cloneDeep(activity);
}

function setActivityContents(source: Activity, sink: Activity) {
  if (sink == null) {
    return;
  }
  sink.setValues(source != null ? source.getValues() : null);
  sink.setSummary(source != null ? source.getSummary() : null);
  sink.setMeta(source != null ? source.getMeta() : null);
  sink.setId(source != null ? source.getId() : null);
}

export const getUnfilteredActivity = (state: State) => state.unfilteredActivity;
export const getSelectedActivityId = (state: State) => state.selectedActivityId;
export const getActivitySport = (state: State) => state.activitySport;
export const getActivitySubSport = (state: State) => state.activitySubSport;
export const getSidebarContents = (state: State) => state.sidebarContent;
export const getFilteredIndices = (state: State) => state.filteredIndices;


