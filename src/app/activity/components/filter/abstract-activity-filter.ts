import {ActivityFilter, ActivityFilterType} from '../../model/activity-filter/activity-filter.model';
import {Activity} from '../../model/activity/Activity_pb';

export abstract class AbstractActivityFilter implements ActivityFilter {

  id: string;
  type: ActivityFilterType;
  filteredIds: number[];

  /**
   * Apply the filter to the activity
   * @param {Activity} the activity to filter
   * @returns {[Activity , number[]]} the filtered activity and a list of ids that were removed
   */
  abstract applyFilter(activity: Activity): number[];

  /**
   * reset the filter to it's initial values (i.e. inactivate the filter without removing it
   */
  abstract clear(): void;

  /**
   * convenience method to remove values from all of activity.getValues() value arrays
   * @param {Activity} activity the activity to filter
   * @param {number[]} indices the array indices to exclude
   */
  // TODO -> add all value types to this filter
  filterAllValuesByIndex(activity: Activity, indices: number[]) {
    activity.getValues().setSpeedList(activity.getValues().getSpeedList().map((v, i) => [v, i])
      .filter(t =>  indices.includes(t[1]))
      .map((v) => v[0]));
  }

  /**
   * rebuild a typescript class from a JSON representation of it
   * @param {Object} obj  JSON representation of the activity filter
   * @returns {ActivityFilter} typescript representation of the activity filter
   * (i.e. add the applyFilter and clear() methods)
   */
  abstract reHydrate(obj: Object): ActivityFilter;

}
