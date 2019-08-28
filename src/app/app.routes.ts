import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import {NgModule} from '@angular/core';
import {AuthGuard} from './auth/guards/auth.guard';
import {HomeComponent} from './shared/components/home/home.component';

const appRoutes: Routes = [


  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
   // {path: '/404',  component: NotFoundComponent, canActivate: [AuthGuard]},
  {
    path: 'activity',
    loadChildren: () => import('./activity/activity.module').then(m => m.ActivityModule),
    canLoad: [AuthGuard]
  },
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes,  { enableTracing: !environment.production })
    RouterModule.forRoot(appRoutes,  { enableTracing: false })
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
