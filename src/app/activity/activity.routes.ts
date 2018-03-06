import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ActivityModuleComponent} from './components/main/activity-module.component';
import {ActivityModule} from './activity.module';
import {NotFoundComponent} from '../shared/components/not-found/not-found.component';
import {ActivityRootComponent} from './components/activity-root/activity-root.component';

const activityRoutes: Routes = [
  {
    path: 'activity', component: ActivityRootComponent, children: [
      {path: ':id', component: ActivityModuleComponent}
    ]
  }
]
@NgModule({
  imports: [
    RouterModule.forChild(activityRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ActivityRoutesModule {}
