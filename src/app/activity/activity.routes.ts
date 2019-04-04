import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ActivityRootComponent} from './containers/activity-root/activity-root.component';
import {ViewActivityPageComponent} from './containers/view-activity-page/view-activity-page.component';
import {ActivityExistsGuard} from './guards/activity-exists';
import {AuthGuard} from '../auth/guards/auth.guard';
import {NotFoundComponent} from '../shared/components/not-found/not-found.component';
import {ImportComponent} from './components/import/import.component';

const activityRoutes: Routes = [
  {
    path: 'activity', component: ActivityRootComponent, children: [
      {path: ':id',
        component: ViewActivityPageComponent,
        canActivate: [AuthGuard, ActivityExistsGuard]
      },
      {path: '',
        component: NotFoundComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'import',
    component: ImportComponent,
    canActivate: [AuthGuard]
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
