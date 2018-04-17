import {ActivityFilter} from '../../model/activity-filter.model';

export interface MinMaxActivityFilter extends ActivityFilter {
   _min: number;
   _max: number;
}
