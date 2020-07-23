import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../auth/guards/auth.guard';
import {SearchRootComponent} from './components/search-root/search-root.component';
import {ViewSearchPageComponent} from './components/view-search-page/view-search-page.component';

const searchRoutes: Routes = [
  {
    path: 'search', component: SearchRootComponent, children: [
      {path: ':params',
        component: ViewSearchPageComponent,
        canActivate: [AuthGuard]
      },
      {path: '',
        component: ViewSearchPageComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(searchRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SearchRoutesModule {}
