import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ActivityModuleComponent } from './activity-module/activity-module.component';
import { SummaryPanelContainerComponent } from './activity-module/summary-panel-container/summary-panel-container.component';
import { ActivityGraphContainerComponent } from './activity-module/activity-graph-container/activity-graph-container.component';
import { MapContainerComponent } from './activity-module/map-container/map-container.component';
import { CreateComponent } from './create/create.component';

@NgModule({
  declarations: [
    AppComponent,
    ActivityModuleComponent,
    SummaryPanelContainerComponent,
    ActivityGraphContainerComponent,
    MapContainerComponent,
    CreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
