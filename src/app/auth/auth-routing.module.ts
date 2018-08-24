import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from './containers/login-page.component';
import {SignupPageComponent} from './containers/signup-page.component';
import {ForgotPageComponent} from './containers/forgot-page.component';
import {ResetPageComponent} from './containers/reset-page.component';

const routes: Routes = [
  {path: 'signin', component: LoginPageComponent},
  {path: 'signup', component: SignupPageComponent},
  {path: 'forgot', component: ForgotPageComponent},
  {path: 'reset', component: ResetPageComponent}
  ];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class AuthRoutingModule { }
