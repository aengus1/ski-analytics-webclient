import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';

import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from './shared/shared.module';
import {ChartModule} from './chart/chart.module';
import {ActivityModule} from './activity/activity.module';
import {AppRoutingModule} from './app.routes';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from './reducers';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {RouterStateSerializer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {EffectsModule} from '@ngrx/effects';
import {CustomRouterStateSerializer} from './shared/utils';
import {LoggerService} from './shared/services/logger.service';
import {ConsoleLoggerService} from './shared/services/console-logger.service';
import {AmplifyAngularModule, AmplifyService} from 'aws-amplify-angular';
import {AuthModule} from './auth/auth.module';
import {AuthGuard} from './auth/guards/auth.guard';
import {AuthService} from './auth/services/auth.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ActivityModule,
    SharedModule,
    AuthModule.forRoot(),
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    /**
     * @ngrx/router-store keeps router state up-to-date in the store.
     */
    StoreRouterConnectingModule.forRoot({
      /*
        They stateKey defines the name of the state used by the router-store reducer.
        This matches the key defined in the map of reducers
      */
      stateKey: 'router',
    }),
    /**
     * EffectsModule.forRoot() is imported once in the root module and
     * sets up the effects class to be initialized immediately when the
     * application starts.
     *
     * See: https://github.com/ngrx/platform/blob/master/docs/effects/api.md#forroot
     */
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }) : [],
    AmplifyAngularModule
  ],
  providers: [
    SharedModule,
    ActivityModule,
    ChartModule,
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
    { provide: LoggerService, useClass: ConsoleLoggerService },
    AmplifyService,
    AuthService,
    AuthGuard

    ],
  exports: [AppRoutingModule],

  bootstrap: [AppComponent]
})
export class AppModule {
}
