import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Activity} from '../../model/activity/Activity_pb';

import {MessageEvent} from '../../../shared/utils';
import {AddActivityFilter, DeleteActivityFilter, UpdateActivityFilter} from '../../actions/activity-filter.actions';
import {CloseSidebar, OpenSidebar} from '../../../shared/layout/actions/layout.actions';
import {ActivitySidebarType, SetSidebarContent} from '../../actions/activity.actions';
import {ActivityFilter} from '../../model/activity-filter/activity-filter.model';
import {Dictionary} from '@ngrx/entity/src/models';
import * as fromActivity from '../../reducers';
import {select, Store} from '@ngrx/store';
import {MinMaxActivityFilter} from '../../model/activity-filter/min-max-activity-filter.model';
import {FilterService} from '../../services/filter-service/filter.service';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {HrzoneFilter} from '../../components/filter/filter-hrzone/hrzone-filter';

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.css']
})
export class FilterListComponent implements OnInit {


  @Input()
  filterOpen: boolean;
  @Input()
  public activity: Activity;
  @Output()
  changeEvent = new EventEmitter<MessageEvent<number | string>>();
  public filterCount = 0;
  public filters$: Observable<Dictionary<ActivityFilter>>;
  constructor(private store: Store<fromActivity.State>, private filterService: FilterService) {

  }

  ngOnInit() {
    this.filters$ = this.store.pipe(select(fromActivity.getActivityFilterEntities));
    this.filterCount = this.filterService.getAllKeys().length;
  }

  receiveMessage($event) {
    switch ($event.name) {
      case 'filterCategory': {
        console.log('received category filter' + $event.payload[0] + ' ' + $event.payload[1]);
        this.store.pipe(select(fromActivity.getActivityFilterEntities)).pipe(take(1))
          .subscribe( (allFilters: Dictionary<ActivityFilter>) => {
            if (allFilters[$event.payload[0]] === undefined ) {
              return;
            }
            this.reHydrateFilters(allFilters);
            const currentFilter = <HrzoneFilter>this.reHydrateFilter(allFilters[$event.payload[0]]);
            currentFilter.setUserZoneBoundaries($event.payload[2]);
            console.log('zone filter: ' + $event.payload[1]);
            allFilters[$event.payload[0]] = currentFilter;
            currentFilter.initialZones = $event.payload[1];
            this.updateActivityFilter(currentFilter, allFilters);
          });
        return;
      }
      case 'filterMin': {
        this.store.pipe(select(fromActivity.getActivityFilterEntities)).pipe(take(1))
          .subscribe( (allFilters: Dictionary<ActivityFilter>) => {
          if (allFilters[$event.payload[0]] === undefined ) {
            return;
          }
          this.reHydrateFilters(allFilters);
          const currentFilter = <MinMaxActivityFilter>this.reHydrateFilter(allFilters[$event.payload[0]]);
          allFilters[$event.payload[0]] = currentFilter;
          currentFilter._min = $event.payload[1];
          this.updateActivityFilter(currentFilter, allFilters);
        });
        return;
      }
      case 'filterMax': {
        this.store.pipe(select(fromActivity.getActivityFilterEntities)).pipe(take(1))
          .subscribe( (v: Dictionary<ActivityFilter>) => {
          if (v[$event.payload[0]] === undefined ) {
            return;
          }
          this.reHydrateFilters(v);
          const hFilter = <MinMaxActivityFilter>this.reHydrateFilter(v[$event.payload[0]]);
          v[$event.payload[0]] = hFilter;
          hFilter._max = $event.payload[1];
          this.updateActivityFilter(hFilter, v);
        });
        return;
      }
      case 'clearFilter': {
        this.store.pipe(select(fromActivity.getActivityFilterEntities)).pipe(take(1)).subscribe( (v: Dictionary<ActivityFilter>) => {
          console.log(JSON.stringify(v[$event.payload]));
          if (v[$event.payload] === undefined ) {
            return;
          }
          this.reHydrateFilters(v);
          const hFilter = this.reHydrateFilter(v[$event.payload]);
          hFilter.clear();
          v[$event.payload] = hFilter;
          this.updateActivityFilter(hFilter, v);
        });
        return;
      }
      case 'removeActivityFilter': {
        if (this.filterCount > 0 ) {
          this.filterCount--;
          this.changeEvent.emit(new MessageEvent('decFilterCount', 0));
        }
        this.filterService.removeFilter($event.payload);
        this.store.pipe(select(fromActivity.getActivityFilterEntities)).pipe(take(1)).subscribe( (v: Dictionary<ActivityFilter>) => {
          if (v[$event.payload] === undefined ) {
            return;
          } else {
            delete v[$event.payload];
          }
          this.reHydrateFilters(v);
          return this.deleteActivityFilter($event.payload, v);
        });
        return;
      }
      case 'addActivityFilter': {
        this.changeEvent.emit(new MessageEvent('incFilterCount', 0));
        this.filterCount++;
        this.filterService.registerFilter($event.payload.id, $event.payload);
        const filters: Dictionary<ActivityFilter> = {};
        filters[$event.payload.id] = $event.payload;
        return this.addActivityFilter($event.payload, filters);
      }
      default: {
        this.changeEvent.emit($event);
      }
    }
  }
  openSidebar() {
    this.store.dispatch(new OpenSidebar());
  }



  closeSidebar() {
    this.store.dispatch(new CloseSidebar());
  }

  setSidebarContent(type: ActivitySidebarType) {
    this.store.dispatch(new SetSidebarContent(type));
  }

  addActivityFilter(filter: ActivityFilter, filters: Dictionary<ActivityFilter>) {
    this.store.dispatch(new AddActivityFilter({activityFilter: filter, allFilters: filters}));
  }

  deleteActivityFilter(filterId: string, filters: Dictionary<ActivityFilter>) {
    this.store.dispatch(new DeleteActivityFilter({id: filterId, allFilters: filters}));
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
