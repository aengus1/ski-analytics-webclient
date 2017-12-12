import {Component, OnInit, ViewChild} from '@angular/core';
import {SidebarComponent} from './sidebar/sidebar.component';

@Component({
  selector: 'app-activity-module',
  templateUrl: './activity-module.component.html',
  styleUrls: ['./activity-module.component.css']
})
export class ActivityModuleComponent implements OnInit {

  @ViewChild(SidebarComponent) sidebar;

  summaryDisplay: Boolean = true;
  sidebarOpen = false;
  filterOpen = false;
  attributeOpen = false;

  constructor() { }


  ngOnInit() {
  }

  toggleSidebarFilter() {
    if (this.filterOpen) {
      this.filterOpen = false;
      this.sidebarOpen = false;
      this.sidebar.closeFilter();
    } else {
      this.attributeOpen = false;
      this.filterOpen = true;
      this.sidebarOpen = true;
      this.sidebar.openFilter();
    }
  }

  toggleMobileFilter() {
    if (this.filterOpen) {
      this.filterOpen = false;
      this.attributeOpen = false;
    } else {
      this.attributeOpen = false;
      this.filterOpen = true;
    }
  }

  toggleMobileAttribute() {
    if (this.attributeOpen) {
      this.attributeOpen = false;
      this.filterOpen = false;
    } else {
      this.filterOpen = false;
      this.attributeOpen = true;
    }
  }


   toggleSidebarAttribute() {
     if (this.attributeOpen) {
       this.attributeOpen = false;
       this.sidebarOpen = false;
       this.sidebar.closeAttribute();
     } else {
       this.filterOpen = false;
       this.attributeOpen = true;
       this.sidebarOpen = true;
       this.sidebar.openAttribute();
     }
  }

  receiveMessage($event) {
    switch ($event) {
      case 'closeSidebar':
        this.sidebarOpen = false;
        this.attributeOpen = false;
        this.filterOpen = false;
    }
  }





}
