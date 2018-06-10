import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromActivity from '../../reducers/activity.reducer';
import * as activity from '../../actions/activity.actions';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';


/**
 *
 * The View Activity Page's responsibility is to map router params
 * to a 'Select' activity action. Actually showing the selected
 * activity remains a responsibility of the
 * SelectedActivityPageComponent
 */

@Component({
  selector: 'app-view-activity-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<app-selected-activity-page></app-selected-activity-page>`
})
export class ViewActivityPageComponent implements OnDestroy {

  actionsSubscription: Subscription;

  constructor(store: Store<fromActivity.State>, route: ActivatedRoute) {
    this.actionsSubscription = route.params
      .pipe(map(params => new activity.SelectActivity(params.id)))
      .subscribe(store);
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();

  }
}
