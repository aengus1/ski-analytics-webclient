import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import {NgModule} from '@angular/core';
import {environment} from '../environments/environment';

const appRoutes: Routes = [
  {path: '', redirectTo: 'activity', pathMatch: 'full'},
  {path: 'activity', loadChildren: './activity/activity.module#ActivityModule'},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes,  { enableTracing: !environment.production })
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
