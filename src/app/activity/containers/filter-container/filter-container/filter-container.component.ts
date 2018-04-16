import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromActivity from '../../../reducers';
import {FilterService} from '../../../services/filter-service/filter.service';
import {ActivityFilter} from '../../../model/activity-filter.model';
import {Dictionary} from '@ngrx/entity/src/models';
import {MinMaxActivityFilter} from '../../../components/filter/MinMaxActivityFilter';
import {
  AddActivityFilter,
  ClearActivityFilters,
  DeleteActivityFilter,
  UpdateActivityFilter
} from '../../../actions/activity-filter.actions';
import {Observable} from 'rxjs/Observable';
import {Activity} from '../../../model/Activity_pb';

@Component({
  selector: 'app-filter-container',
  template: `<app-filter-list
    [activity] = "activity$ | async"
  (changeEvent)="receiveMessage($event)">
    <ng-content></ng-content>
  </app-filter-list>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterContainerComponent implements OnInit {
  activity$: Observable<Activity>;

  constructor(private store: Store<fromActivity.State>, private filterService: FilterService) {
    this.activity$ = store.pipe(select(fromActivity.getSelectedActivity));
  }

  ngOnInit() {
  }

  receiveMessage($event) {
    console.log('RECEIVED EVENT: ' + $event.name + ' ' + $event.payload);
    switch ($event.name) {
      case 'filterMin': {
        this.store.pipe(select(fromActivity.getActivityFilterEntities)).take(1).subscribe( (v: Dictionary<ActivityFilter>) => {
          if (v[$event.payload[0]] === undefined ) {
            return;
          }
          this.reHydrateFilters(v);
          const hFilter = <MinMaxActivityFilter>this.reHydrateFilter(v[$event.payload[0]]);

          hFilter._min = $event.payload[1];
          this.updateActivityFilter(hFilter, v);
        });
        return;
      }
      case 'filterMax': {
        this.store.pipe(select(fromActivity.getActivityFilterEntities)).take(1).subscribe( (v: Dictionary<ActivityFilter>) => {
          if (v[$event.payload[0]] === undefined ) {
            return;
          }
          this.reHydrateFilters(v);
          const hFilter = <MinMaxActivityFilter>this.reHydrateFilter(v[$event.payload[0]]);

          hFilter._max = $event.payload[1];
          this.updateActivityFilter(hFilter, v);
        });
        return;
      }
      case 'clearFilter': {
        this.store.pipe(select(fromActivity.getActivityFilterEntities)).take(1).subscribe( (v: Dictionary<ActivityFilter>) => {
          console.log('v=' + JSON.stringify(v ));
          if (v[$event.payload] === undefined ) {
            return;
          }
          this.reHydrateFilters(v);
          const hFilter = this.reHydrateFilter(v[$event.payload]);

          hFilter.clear();
          this.updateActivityFilter(hFilter, v);
        });
        return;
      }
      case 'removeActivityFilter': {
        this.filterService.removeFilter($event.payload);
        return this.deleteActivityFilter($event.payload);
      }
      case 'addActivityFilter': {
        this.filterService.registerFilter($event.payload.id, $event.payload);
        const filters: Dictionary<ActivityFilter> = {};
        filters[$event.payload.id] = $event.payload;
        return this.addActivityFilter($event.payload, filters);
      }
    }
  }

  addActivityFilter(filter: ActivityFilter, filters: Dictionary<ActivityFilter>) {
    this.store.dispatch(new AddActivityFilter({activityFilter: filter, allFilters: filters}));
  }

  deleteActivityFilter(filterId: string) {
    this.store.dispatch(new DeleteActivityFilter({id: filterId}));
  }

  clearActivityFilters() {
    this.store.dispatch(new ClearActivityFilters());
  }

  updateActivityFilter(filter: ActivityFilter, filters: Dictionary<ActivityFilter>) {
    this.store.dispatch(new UpdateActivityFilter({activityFilter: {id: filter.id, changes: filter}, allFilters: filters}));
  }

  /**
   * redux store strips the filter object of methods, so need to create a new one using store values using rehydrate
   * @param {Dictionary<ActivityFilter>} filterValues json dictionary of activityFilters
   */
  private reHydrateFilters(filterValues: Dictionary<ActivityFilter>): void {
    const filterKeys = this.filterService.getAllKeys();
    filterKeys.forEach(key => {
      filterValues[key] = this.filterService.getFilter(key).reHydrate(filterValues[key]);
    });
  }

  /**
   * @param {ActivityFilter} filter json structure conforming to activityFilter class
   * @returns {ActivityFilter} new filter class containing methods
   */
  private reHydrateFilter(filter: ActivityFilter): ActivityFilter {
    return this.filterService.getFilter(filter.id).reHydrate(filter);
  }
}
