import {Activity} from './Activity_pb';

export enum ActivityFilterType {
  Speed, TimeInZone
}
export interface ActivityFilter {
  id: string;
  type: ActivityFilterType;
  applyFilter(activity: Activity): [Activity, number[]];
}
