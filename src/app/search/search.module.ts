import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {ChartModule} from '../chart/chart.module';
import {environment} from '../../environments/environment';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {DefaultRouterStateSerializer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {LoggerService} from '../shared/services/logger.service';
import { SearchRootComponent } from './containers/search-root/search-root.component';
import {SearchRoutesModule} from './search.routes';
import {SearchService} from './services/search.service';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { SearchComponent } from './components/search/search.component';
import { ViewSearchResultComponent } from './containers/view-search-result/view-search-result.component';
import { SearchContainerComponent } from './containers/search-container/search-container.component';
import {EffectsModule} from '@ngrx/effects';
import {SearchEffects} from './effects/search.effects';
import {StoreModule} from '@ngrx/store';
import {reducers} from '../search/reducers';
import { PageNumberDisplayComponent } from './components/page-number-display/page-number-display.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ChartModule,
    SearchRoutesModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreModule.forFeature('search', reducers),
    StoreRouterConnectingModule.forRoot({ serializer: DefaultRouterStateSerializer,
      stateKey: 'router' // name of reducer key
    }),
    EffectsModule.forFeature([SearchEffects]),
    NgbModule,
    FormsModule
  ],
  declarations: [
    SearchRootComponent,
    SearchComponent,
    SearchBarComponent,
    SearchResultsComponent,
    SearchComponent,
    ViewSearchResultComponent,
    SearchContainerComponent,
    PageNumberDisplayComponent
  ],
  providers: [
    SearchService, LoggerService
  ],
  exports: [
    SearchBarComponent,
    SearchResultsComponent,
    SearchComponent,
    SearchRootComponent,
    ViewSearchResultComponent,
    SearchContainerComponent,
    PageNumberDisplayComponent
  ]
})
export class SearchModule { }
