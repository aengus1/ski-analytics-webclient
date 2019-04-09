import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap, take, tap} from 'rxjs/operators';

import {ActivityService} from '../services/activity-service/activity.service';
import * as fromActivities from '../reducers';
import * as activity from '../actions/activity.actions';


/**
 * Guards are hooks into the route resolution process, providing an opportunity
 * to inform the router's navigation process whether the route should continue
 * to activate this route. Guards must return an observable of true or false.
 */
@Injectable()
export class ActivityExistsGuard implements CanActivate {
  constructor(
    private store: Store<fromActivities.State>,
    private activityService: ActivityService,
    private router: Router
  ) {}

  /**
   * This method checks if an activity with the given ID is already registered
   * in the Store
   */
  hasActivityInStore(id: string): Observable<boolean> {
    console.log(' has activity in store called');
    return this.store.pipe(
      select(fromActivities.getActivityEntities),
      map(entities => !!entities[+id + 1]),
      take(1)
    );
  }

  /**
   * This method loads an activity with the given ID from the API and caches
   * it in the store, returning `true` or `false` if it was found.
   */
  hasActivityInApi(id: string): Observable<boolean> {
    console.log('calling hasActivityInAPI for ' + id);
    return this.activityService.getActivity(id).pipe(
      map(activityEntity => new activity.LoadActivity(activityEntity)),
      tap((action: activity.LoadActivity) => this.store.dispatch(action)),
      map(act => !!act),
      catchError((e) => {
        console.log('error occurred fetching activity ' + JSON.stringify(e));
        this.router.navigate(['/404']);
        return of(false);
      })
    );
  }

  /**
   * `hasActivity` composes `hasActivityInStore` and `hasActivityInApi`. It first checks
   * if the activity is in store, and if not it then checks if it is in the
   * API.
   */
  hasActivity(id: string): Observable<boolean> {
    return this.hasActivityInStore(id).pipe(
      switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }

        return this.hasActivityInApi(id);
      })
    );
  }

  /**
   * This is the actual method the router will call when our guard is run.
   *
   * Our guard waits for the collection to load, then it checks if we need
   * to request a book from the API or if we already have it in our cache.
   * If it finds it in the cache or in the API, it returns an Observable
   * of `true` and the route is rendered successfully.
   *
   * If it was unable to find it in our cache or in the API, this guard
   * will return an Observable of `false`, causing the router to move
   * on to the next candidate route. In this case, it will move on
   * to the 404 page.
   */
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    console.log(' has activty guard called');
      return this.hasActivity(route.params['id'] );
  }
}



