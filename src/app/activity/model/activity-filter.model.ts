import {Activity} from './Activity_pb';

export enum ActivityFilterType {
  Speed, TimeInZone
}
export interface ActivityFilter {
  id: string;
  type: ActivityFilterType;
  filteredIds: number[];
  active: boolean;

  /**
   * Apply the filter to the activity. Returns the filtered activity and a list of ids that were removed
   * @param {Activity} activity
   * @returns {[Activity , number[]]}
   */
  applyFilter(activity: Activity): [Activity, number[]];

  /**
   * Clear the filter from th
   */
  clear(): void;

   reHydrate(obj: Object): ActivityFilter;
}
