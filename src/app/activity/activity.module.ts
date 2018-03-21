import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {ChartModule} from '../chart/chart.module';
import {ActivityGraphContainerComponent} from './containers/activity-graph-container/activity-graph-container.component';
import {SummaryPanelContainerComponent} from './containers/summary-panel-container/summary-panel-container.component';
import {SummaryMetadataComponent} from './components/summary-metadata/summary-metadata.component';
import {ActivityModuleComponent} from './components/main/activity-module.component';
import {MapContainerComponent} from './containers/map-container/map-container.component';
import {ActivityService} from './services/activity-service/activity.service';
import {D3Service} from 'd3-ng2-service';
import {MockActivityService} from './services/activity-service/mock.activity.service';
import {FilterContainerComponent} from './components/filter-container/filter-container.component';
import {AttributeContainerComponent} from './components/attribute-container/attribute-container.component';
import {ActivityRoutesModule} from './activity.routes';
import { ActivityRootComponent } from './components/activity-root/activity-root.component';
import { StoreModule } from '@ngrx/store';
import {reducers} from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { ViewActivityPageComponent } from './containers/view-activity-page/view-activity-page.component';
import { SelectedActivityPageComponent } from './containers/selected-activity-page/selected-activity-page.component';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {ActivityExistsGuard} from './guards/activity-exists';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ChartModule,
    ActivityRoutesModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreModule.forFeature('activities', reducers),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router' // name of reducer key
    })

  ],
  declarations: [
    ActivityModuleComponent,
    SummaryPanelContainerComponent,
    ActivityGraphContainerComponent,
    MapContainerComponent,
    FilterContainerComponent,
    AttributeContainerComponent,
    SummaryMetadataComponent,
    ActivityRootComponent,
    ViewActivityPageComponent,
    SelectedActivityPageComponent
  ],
  providers: [
    ActivityService, MockActivityService, D3Service, ActivityExistsGuard
  ],
  exports: [ActivityModuleComponent, FilterContainerComponent, MapContainerComponent, AttributeContainerComponent,
  SummaryPanelContainerComponent]
})
export class ActivityModule { }
