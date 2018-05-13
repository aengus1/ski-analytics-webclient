import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {ActivityFilterActionTypes, FilterActivity} from '../actions/activity-filter.actions';
import {map} from 'rxjs/operators';

@Injectable()
export class FilterEffects {

  constructor(private actions$: Actions) {}

  @Effect()
  updateFilter$  = this.actions$.pipe(
    ofType<FilterActivity>(ActivityFilterActionTypes.UpdateActivityFilter, ActivityFilterActionTypes.DeleteActivityFilter),
    map(action => action.payload),
    map(p => {
      return new FilterActivity({'activityFilter': p.activityFilter, 'allFilters': p.allFilters});
    }));


  // @Effect()
  // reSubscribeContainer  = this.actions$.pipe(
  //   ofType<FilterActivity>(ActivityFilterActionTypes.FilterActivity),
  //   map(p => {
  //     console.log(' in effect');
  //     return new FilterActivitySuccess();
  //   }));



}
