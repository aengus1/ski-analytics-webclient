import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {Activity} from '../../model/activity/Activity_pb';
import {select, Store} from '@ngrx/store';
import * as fromActivity from '../../reducers/';
import {ActivitySidebarType, SetSidebarContent} from '../../actions/activity.actions';
import {CloseSidebar, OpenSidebar} from '../../../shared/layout/actions/layout.actions';

import {ActivityComponent} from '../../components/activity/activity.component';


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
  @ViewChild(ActivityComponent, { static: true }) activityModuleComponent;

  constructor(private store: Store<fromActivity.State>) {
    this.activity$ = store.pipe(select(fromActivity.getSelectedActivity));
    this.activitySport$ = store.pipe(select(fromActivity.getActivitySport));
    this.activitySubSport$ = store.pipe(select(fromActivity.getActivitySubSport));
    this.sidebarOpen$ = store.pipe(select(fromActivity.getShowSidebar));
    this.sidebarContent$ = store.pipe(select(fromActivity.getSidebarContent));
  }


  receiveMessage($event) {
    // console.log('RECEIVED EVENT: ' + $event.name + ' ' + $event.payload);
    switch ($event.name) {
      case 'closeSidebar':
        return this.closeSidebar();
      case 'openSidebar':
        return  this.openSidebar();
      case 'setSidebarContent':
        return this.setSidebarContent($event.payload);
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

}
