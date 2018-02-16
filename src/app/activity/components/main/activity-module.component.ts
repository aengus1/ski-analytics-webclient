import {AfterViewChecked, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {SidebarComponent} from '../../../shared/components/sidebar/sidebar.component';
import {ActivatedRoute, Params} from '@angular/router';
import {ActivityService} from '../../services/activity-service/activity.service';



@Component({
  selector: 'app-activity-module',
  templateUrl: './activity-module.component.html',
  styleUrls: ['./activity-module.component.css']
})
export class ActivityModuleComponent implements OnInit, AfterViewChecked {

  @ViewChild(SidebarComponent) sidebar;

  summaryDisplay: Boolean = true;
  sidebarOpen = false;
  filterOpen = false;
  attributeOpen = false;
  activity$ = null;

  constructor(private cdRef: ChangeDetectorRef, private route: ActivatedRoute, private activityService: ActivityService ) { }


  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          console.log('activity module id = ' + params['id']);
          this.activity$ = this.activityService.getActivity(params['id']);
        }
      );
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
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
