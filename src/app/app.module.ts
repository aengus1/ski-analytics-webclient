import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';

import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from './shared/shared.module';
import {ChartModule} from './chart/chart.module';
import {ActivityModule} from './activity/activity.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ActivityModule,
    SharedModule
  ],
  providers: [SharedModule,
    ActivityModule,
    ChartModule],

  bootstrap: [AppComponent]
})
export class AppModule {
}
