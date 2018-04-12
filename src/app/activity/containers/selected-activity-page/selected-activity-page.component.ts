import {AfterContentInit, Component} from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Activity} from '../../model/Activity_pb';
import {Store, select} from '@ngrx/store';
import * as fromActivity from '../../reducers/';
import {ActivitySidebarType, FilterSelectedActivity, SetSidebarContent} from '../../actions/activity.actions';
import {CloseSidebar, OpenSidebar} from '../../../shared/layout/actions/layout.actions';
import {ActivityFilter} from '../../model/activity-filter.model';
import {
  AddActivityFilter,
  ClearActivityFilters,
  DeleteActivityFilter,
  UpdateActivityFilter
} from '../../actions/activity-filter.actions';
import {SpeedFilter} from '../../components/filter-speed/SpeedFilter';
import {getActivityFilterEntitiesState} from '../../reducers';
import {Dictionary} from '@ngrx/entity/src/models';



@Component({
  selector: 'app-selected-activity-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<app-activity-module
  [activity] = "activity$ | async"
  [ActivitySport]="activitySport$ | async"
  [ActivitySubSport]="activitySubSport$ | async"
  [sidebarOpen]="sidebarOpen$ | async"
  [sidebarContent]="sidebarContent$ | async"
  (messageEvent)="receiveMessage($event)"
  ></app-activity-module>`

})
export class SelectedActivityPageComponent {
 activity$: Observable<Activity>;
 activitySport$: Observable<string[]>;
  activitySubSport$: Observable<string[]>;
  sidebarOpen$: Observable<boolean>;
  sidebarContent$: Observable<ActivitySidebarType>;

  constructor(private store: Store<fromActivity.State>) {
    this.activity$ = store.pipe(select(fromActivity.getSelectedActivity));
    this.activitySport$ = store.pipe(select(fromActivity.getActivitySport));
    this.activitySubSport$ = store.pipe(select(fromActivity.getActivitySubSport));
    this.sidebarOpen$ = store.pipe(select(fromActivity.getShowSidebar));
    this.sidebarContent$ = store.pipe(select(fromActivity.getSidebarContent));
  }


  receiveMessage($event) {
    console.log('RECEIVED EVENT: ' + $event.name + ' ' + $event.payload);
    switch ($event.name) {
      case 'closeSidebar':
        return this.closeSidebar();
      case 'openSidebar':
        return  this.openSidebar();
      case 'setSidebarContent':
        return this.setSidebarContent($event.payload);
      case 'filterMax':
      case 'filterMin': {
        console.log('payload 0'  + '' + JSON.stringify($event.payload));
        this.store.pipe(select(fromActivity.getActivityFilterEntities)).subscribe( (v: Dictionary<ActivityFilter>) => {
         const filter: SpeedFilter = <SpeedFilter>v[$event.payload[0]];
         const min: number = $event.payload[1];
          filter.min = min;
          console.log('filter = ' + JSON.stringify(v[$event.payload[0]]));
          this.updateActivityFilter(filter, v);
        });
        // this.store.pipe(select(fromActivity.getActivityFilterIds)).subscribe( v => console.log(' v = ' + v));
        // console.log('selected  filter: ' + JSON.stringify(fromActivity.getActivityFilterEntities[ '' + $event.payload[0]]));
        // filter.max = $event.payload[1];
        // this.updateActivityFilter(filter);
        // this.filterSelectedActivity();
        return;
      }
      case 'addActivityFilter': {
        console.log('add with: ' + JSON.stringify($event.payload));
        return this.addActivityFilter($event.payload);
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

  addActivityFilter(filter: ActivityFilter) {
    this.store.dispatch(new AddActivityFilter({activityFilter: filter}));
  }

 deleteActivityFilter(filter: ActivityFilter) {
    this.store.dispatch(new DeleteActivityFilter({id: filter.id}));
  }

  clearActivityFilters() {
    this.store.dispatch(new ClearActivityFilters());
  }

  updateActivityFilter(filter: ActivityFilter, filters: Dictionary<ActivityFilter>) {
    this.store.dispatch(new UpdateActivityFilter({activityFilter: {id: filter.id, changes: filter}, allFilters: filters}));
  }

  // filterSelectedActivity(filters: ActivityFilter[]) {
  //   this.store.dispatch(new FilterSelectedActivity((filters)));
  // }



}
