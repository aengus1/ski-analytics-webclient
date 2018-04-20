import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {ActivityFilterActionTypes, FilterActivity} from '../actions/activity-filter.actions';
import { switchMap, map } from 'rxjs/operators';
import {FilterSelectedActivity} from '../actions/activity.actions';

@Injectable()
export class FilterEffects {

  constructor(private actions$: Actions) {}

  @Effect()
  updateFilter$  = this.actions$.pipe(
    ofType<FilterActivity>(ActivityFilterActionTypes.UpdateActivityFilter),
    map(action => action.payload),
    map(p => {
      console.log(' in effect');
      return new FilterActivity({'activityFilter': p.activityFilter, 'allFilters': p.allFilters});
    }));

}
