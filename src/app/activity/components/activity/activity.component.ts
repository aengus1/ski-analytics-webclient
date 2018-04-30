import {
  AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output,
  ViewChild
} from '@angular/core';
import {SidebarComponent} from '../../../shared/components/sidebar/sidebar.component';
import {Activity} from '../../model/activity/Activity_pb';
import {ActivitySidebarType} from '../../actions/activity.actions';
import {MessageEvent} from '../../../shared/utils';
import {LoggerService} from '../../../shared/services/logger.service';




@Component({
  selector: 'app-activity-module',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit, AfterViewChecked {


  // the main activity instance
  @Input()
  private activity: Activity;
  // static arrays of activity sport / subsport
  @Input()
  public ActivitySport: string[];
  @Input()
  public ActivitySubSport: string[];

  // the sidebar status
  @Input()
  public sidebarOpen: boolean;

  // the sidebar content type
  @Input()
  public sidebarContent: ActivitySidebarType;

  @Output()
  public messageEvent = new EventEmitter<MessageEvent<string | ActivitySidebarType>>();

  // declare activitySidebarType so it can be used in the template
  public activitySidebarTypes = ActivitySidebarType;

  // local variable for storing display page view in mobile
  public summaryDisplay = true;

  // sidebar component
  @ViewChild(SidebarComponent) sidebar;

  private filterCount = 0;



  constructor(private cdRef: ChangeDetectorRef, private logger: LoggerService ) { }


  ngOnInit() {

  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  toggleSidebar(type: ActivitySidebarType) {
    if (this.sidebarContent !== type) {
      if (!this.sidebarOpen) {
        this.messageEvent.emit(new MessageEvent('openSidebar'));
      }
      this.messageEvent.emit(new MessageEvent<ActivitySidebarType>('setSidebarContent' , type));
    } else {
      this.messageEvent.emit(new MessageEvent<ActivitySidebarType>('setSidebarContent', ActivitySidebarType.NoContent));
      this.messageEvent.emit(new MessageEvent('closeSidebar'));
    }
  }

  receiveMessage($event) {
    this.logger.info('ActivityComponent: received message event:[' + $event
    + '] name:[' + $event.name + '] payload:[' + $event.payload + ']' );
    switch ($event.name) {
      case 'closeSidebar': {
        this.messageEvent.emit(new MessageEvent('closeSidebar'));
        this.messageEvent.emit(new MessageEvent<ActivitySidebarType>('setSidebarContent', ActivitySidebarType.NoContent));
        return;
      }
      case 'incFilterCount': {
       this.filterCount++;
       console.log('this.f ilter count = ' + this.filterCount);
       this.cdRef.detectChanges();
       return;
      }
      case 'decFilterCount': {
        this.filterCount--;
        return;
      }
      default: {
        this.messageEvent.emit($event);
      }
    }
  }
}
