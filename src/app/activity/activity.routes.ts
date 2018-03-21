import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ActivityModuleComponent} from './components/main/activity-module.component';
import {ActivityModule} from './activity.module';
import {NotFoundComponent} from '../shared/components/not-found/not-found.component';
import {ActivityRootComponent} from './components/activity-root/activity-root.component';
import {ViewActivityPageComponent} from './containers/view-activity-page/view-activity-page.component';
import {ActivityExistsGuard} from './guards/activity-exists';

const activityRoutes: Routes = [
  {
    path: 'activity', component: ActivityRootComponent, children: [
      {path: ':id',
        component: ViewActivityPageComponent,
        canActivate: [ActivityExistsGuard]
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
