import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {ChartModule} from '../chart/chart.module';
import {ActivityGraphComponent} from './components/activity-graph/activity-graph.component';
import {SummaryPanelComponent} from './components/summary-panel/summary-panel.component';
import {SummaryMetadataComponent} from './components/summary-metadata/summary-metadata.component';
import {ActivityComponent} from './components/activity/activity.component';
import {MapComponent} from './components/map/map.component';
import {ActivityService} from './services/activity-service/activity.service';
import {D3Service} from 'd3-ng2-service';
import {MockActivityService} from './services/activity-service/mock.activity.service';
import {FilterComponent} from './components/filter/filter.component';
import {AttributeComponent} from './components/attribute/attribute.component';
import {ActivityRoutesModule} from './activity.routes';
import { ActivityRootComponent } from './containers/activity-root/activity-root.component';
import { StoreModule } from '@ngrx/store';
import {reducers} from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { ViewActivityPageComponent } from './containers/view-activity-page/view-activity-page.component';
import { SelectedActivityPageComponent } from './containers/selected-activity-page/selected-activity-page.component';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {ActivityExistsGuard} from './guards/activity-exists';
import {EffectsModule} from '@ngrx/effects';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ChartModule,
    ActivityRoutesModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreModule.forFeature('filters', reducers),
    StoreModule.forFeature('activities', reducers),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router' // name of reducer key
    }),
    // /**
    //  * Effects.forFeature is used to register effects
    //  * from feature modules. Effects can be loaded
    //  * eagerly or lazily and will be started immediately.
    //  *
    //  * All Effects will only be instantiated once regardless of
    //  * whether they are registered once or multiple times.
    //  */
    // EffectsModule.forFeature([ActivityFilterEffects]),

  ],
  declarations: [
    ActivityComponent,
    SummaryPanelComponent,
    ActivityGraphComponent,
    MapComponent,
    FilterComponent,
    AttributeComponent,
    SummaryMetadataComponent,
    ActivityRootComponent,
    ViewActivityPageComponent,
    SelectedActivityPageComponent
  ],
  providers: [
    ActivityService, MockActivityService, D3Service, ActivityExistsGuard
  ],
  exports: [ActivityComponent, FilterComponent, MapComponent, AttributeComponent,
  SummaryPanelComponent]
})
export class ActivityModule { }
