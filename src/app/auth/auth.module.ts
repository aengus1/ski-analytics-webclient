import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EffectsModule} from '@ngrx/effects';
import {LoginFormComponent} from './components/login-form/login-form.component';
import {LoginPageComponent} from './containers/login-page.component';
import {ForgotFormComponent} from './components/forgot-form/forgot-form.component';
import {ForgotPageComponent} from './containers/forgot-page.component';
import {AuthService} from './services/auth.service';
import {AuthRoutingModule} from './auth-routing.module';
import {StoreModule} from '@ngrx/store';
import {AuthGuard} from './guards/auth.guard';
import {AuthEffects} from './effects/auth.effects';
import {reducers} from './reducers';
import {SignupPageComponent} from './containers/signup-page.component';
import {SignupFormComponent} from './components/signup-form/signup-form.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';


export const COMPONENTS = [
  LoginPageComponent,
  LoginFormComponent,
  SignupPageComponent,
  SignupFormComponent,
  ForgotPageComponent,
  ForgotFormComponent
];

@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, RouterModule, SharedModule
  ],
  declarations:  COMPONENTS,
  exports: COMPONENTS
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootAuthModule,
      providers: [AuthService, AuthGuard ]
    };
  }
}

@NgModule({
  imports: [
    AuthModule,
    AuthRoutingModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects]),
  ],
  declarations: [],
  exports: []
})
export class RootAuthModule {}
