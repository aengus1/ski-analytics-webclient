import { Component, OnInit } from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Activity} from '../../model/Activity_pb';
import {Store, select} from '@ngrx/store';
import * as fromActivity from '../../reducers/';
import {ActivityService} from '../../services/activity-service/activity.service';


@Component({
  selector: 'app-selected-activity-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<app-summary-metadata
  [activity] = "activity$ | async"
  [ActivitySport]="activityService.getActivitySport()"
  [ActivitySubSport]="activityService.getActivitySubSport()"
  ></app-summary-metadata>`
})
export class SelectedActivityPageComponent {
 activity$: Observable<Activity>;

  constructor(private store: Store<fromActivity.State>, private activityService: ActivityService) {
    this.activity$ = store.pipe(select(fromActivity.getSelectedActivity));

  }



}
