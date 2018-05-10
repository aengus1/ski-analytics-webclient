import {Activity} from '../activity/Activity_pb';

export enum ActivityFilterType {
  Speed, TimeInZone
}
export interface ActivityFilter {
  id: string;
  type: ActivityFilterType;
  filteredIds: number[];

  /**
   * Apply the filter to the activity. Returns the filtered activity and a list of ids that were removed
   * @param {Activity} activity
   * @returns number[] the list of remaining value ids
   */
  applyFilter(activity: Activity): number[];

  /**
   * Clear the filter from th
   */
  clear(): void;

   reHydrate(obj: Object): ActivityFilter;
}
