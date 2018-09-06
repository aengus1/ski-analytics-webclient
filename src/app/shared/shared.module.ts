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

@NgModule({
  imports: [
    CommonModule, RouterModule, NgbCollapseModule, NgbDropdownModule
  ],
  providers: [
    NgbDropdown
  ],
  declarations: [IntervalPipe, RemoveUnderscorePipe, TitleCasePipe, SidebarComponent,  NotFoundComponent, HomeComponent, NavbarComponent],
  exports: [SidebarComponent, IntervalPipe, RemoveUnderscorePipe, TitleCasePipe, NotFoundComponent, HomeComponent, NavbarComponent]
})
export class SharedModule { }
