import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {EffectsModule} from '@ngrx/effects';
import {LoginFormComponent} from './components/login-form.component';
import {LoginPageComponent} from './containers/login-page.component';
import {AuthService} from './services/auth.service';
import {AuthRoutingModule} from './auth-routing.module';
import {StoreModule} from '@ngrx/store';
import {AuthGuard} from './guards/auth.guard';
import {AuthEffects} from './effects/auth.effects';
import {reducers} from '../reducers';

export const COMPONENTS = [LoginPageComponent, LoginFormComponent];

@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule
  ],
  declarations: [ COMPONENTS, LoginFormComponent, LoginPageComponent ],
  exports: [COMPONENTS]
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
})
export class RootAuthModule {}
