import {ActivityFilter} from './activity-filter.model';

export interface MinMaxActivityFilter extends ActivityFilter {
   _min: number;
   _max: number;
}
