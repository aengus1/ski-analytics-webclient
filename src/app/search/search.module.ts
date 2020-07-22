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
import { SearchRootComponent } from './components/search-root/search-root.component';
import { ViewSearchPageComponent } from './components/view-search-page/view-search-page.component';
import {SearchRoutesModule} from './search.routes';
import {SearchService} from './services/search.service';

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
  declarations: [SearchRootComponent, ViewSearchPageComponent],
  providers: [
    SearchService, LoggerService
  ],
  exports: []
})
export class SearchModule { }
