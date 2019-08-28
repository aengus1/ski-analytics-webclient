import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RemoveUnderscorePipe} from './pipes/remove-underscore.pipe';
import {IntervalPipe} from './pipes/interval.pipe';
import {TitleCasePipe} from './pipes/titlecase.pipe';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {HomeComponent} from './components/home/home.component';
import {RouterModule} from '@angular/router';
import {NavbarComponent} from './components/navbar/navbar.component';
import {NgbCollapseModule, NgbDropdown, NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {AlertComponent} from './components/alert/alert.component';
import {SocketService} from './services/socket.service';

@NgModule({
  imports: [
    CommonModule, RouterModule, NgbCollapseModule, NgbDropdownModule
  ],
  providers: [
    NgbDropdown, SocketService
  ],
  declarations: [IntervalPipe, RemoveUnderscorePipe, TitleCasePipe, SidebarComponent,  NotFoundComponent,
    HomeComponent, NavbarComponent, AlertComponent],
  exports: [SidebarComponent, IntervalPipe, RemoveUnderscorePipe, TitleCasePipe, NotFoundComponent
    , HomeComponent, NavbarComponent, AlertComponent]
})
export class SharedModule { }
