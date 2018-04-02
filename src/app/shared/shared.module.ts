import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RemoveUnderscorePipe} from './pipes/remove-underscore.pipe';
import {IntervalPipe} from './pipes/interval.pipe';
import {TitleCasePipe} from './pipes/titlecase.pipe';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [IntervalPipe, RemoveUnderscorePipe, TitleCasePipe, SidebarComponent,  NotFoundComponent],
  exports: [SidebarComponent, IntervalPipe, RemoveUnderscorePipe, TitleCasePipe, NotFoundComponent]
})
export class SharedModule { }
