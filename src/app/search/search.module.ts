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
import { ViewSearchPageComponent } from './components/view-search-page/view-search-page.component';
import {SearchRoutesModule} from './search.routes';
import {SearchService} from './services/search.service';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { SearchComponent } from './components/search/search.component';
import { ViewSearchResultComponent } from './containers/view-search-result/view-search-result.component';
import { SearchMainComponent } from './containers/search-main/search-main.component';
import { SearchContainerComponent } from './containers/search-container/search-container.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ChartModule,
    SearchRoutesModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({ serializer: DefaultRouterStateSerializer,
      stateKey: 'router' // name of reducer key
    }),
    NgbModule,
    FormsModule
  ],
  declarations: [SearchRootComponent, ViewSearchPageComponent, SearchBarComponent, SearchResultsComponent, SearchComponent, ViewSearchResultComponent, SearchMainComponent, SearchContainerComponent],
  providers: [
    SearchService, LoggerService
  ],
  exports: []
})
export class SearchModule { }
