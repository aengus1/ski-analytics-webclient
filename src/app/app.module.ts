import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ActivityModuleComponent } from './activity-module/activity-module.component';
import { SummaryPanelContainerComponent } from './activity-module/summary-panel-container/summary-panel-container.component';
import { ActivityGraphContainerComponent } from './activity-module/activity-graph-container/activity-graph-container.component';
import { MapContainerComponent } from './activity-module/map-container/map-container.component';
import { FilterContainerComponent } from './activity-module/sidebar/filter-container/filter-container.component';
import { AttributeContainerComponent } from './activity-module/sidebar/attribute-container/attribute-container.component';
import { SidebarComponent } from './activity-module/sidebar/sidebar.component';
import {HttpClientModule} from '@angular/common/http';
import {FetchActivityService} from './activity-module/services/fetch-activity.service';

@NgModule({
  declarations: [
    AppComponent,
    ActivityModuleComponent,
    SummaryPanelContainerComponent,
    ActivityGraphContainerComponent,
    MapContainerComponent,
    FilterContainerComponent,
    AttributeContainerComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [FetchActivityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
