import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../auth/guards/auth.guard';
import {SearchRootComponent} from './containers/search-root/search-root.component';
import {SearchComponent} from './components/search/search.component';
import {ViewSearchResultComponent} from './containers/view-search-result/view-search-result.component';
import {NotFoundComponent} from '../shared/components/not-found/not-found.component';

const searchRoutes: Routes = [
  {
    path: 'search', component: SearchRootComponent, children: [
      {path: ':params',
        component: ViewSearchResultComponent,
        canActivate: [AuthGuard]
      },
      {path: '',
        component: SearchComponent,
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
