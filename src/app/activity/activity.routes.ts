import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ActivityRootComponent} from './containers/activity-root/activity-root.component';
import {ViewActivityPageComponent} from './containers/view-activity-page/view-activity-page.component';
import {ActivityExistsGuard} from './guards/activity-exists';
import {AuthGuard} from '../auth/guards/auth.guard';

const activityRoutes: Routes = [
  {
    path: 'activity', component: ActivityRootComponent, children: [
      {path: ':id',
        component: ViewActivityPageComponent,
        canActivate: [ActivityExistsGuard, AuthGuard]
      }
    ]
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(activityRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ActivityRoutesModule {}
