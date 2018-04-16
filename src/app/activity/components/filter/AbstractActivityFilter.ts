import {ActivityFilter, ActivityFilterType} from '../../model/activity-filter.model';
import {Activity} from '../../model/Activity_pb';

export abstract class AbstractActivityFilter implements ActivityFilter {

  id: string;
  type: ActivityFilterType;
  filteredIds: number[];
  active: boolean;

  /**
   * Apply the filter to the activity. Returns the filtered activity and a list of ids that were removed
   * @param {Activity} activity
   * @returns {[Activity , number[]]}
   */
  abstract applyFilter(activity: Activity): [Activity, number[]];
  abstract clear(): void;

  filterAllValuesByIndex(activity: Activity, indices: number[]) {
    activity.getValues().setSpeedList(activity.getValues().getSpeedList().map((v, i) => [v, i])
      .filter(t =>  indices.includes(t[1]))
      .map((v, i) => v[0]));
  }

  abstract reHydrate(obj: Object): ActivityFilter;

}
