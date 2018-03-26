import { Component } from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Activity} from '../../model/Activity_pb';
import {Store, select} from '@ngrx/store';
import * as fromActivity from '../../reducers/';
import {ActivitySidebarType, SetSidebarContent} from '../../actions/activity.actions';
import {CloseSidebar, OpenSidebar} from '../../../shared/layout/actions/layout.actions';


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
