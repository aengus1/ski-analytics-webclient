import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from './containers/login-page.component';

const routes: Routes = [{path: 'signin', component: LoginPageComponent}];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class AuthRoutingModule { }
