/**
 * Simple interface for concrete filter components to extend.  This allows the parent FilterComponent to communicate down
 * the chain with the component using ViewChild
 */
import {ActivityFilter} from '../../model/activity-filter/activity-filter.model';


export abstract class FilterBase {
  abstract reset (): void;
  abstract getFilterId(): string;
  abstract enable(): void;
  abstract disable(): void;
  abstract set(filter: ActivityFilter);
}
