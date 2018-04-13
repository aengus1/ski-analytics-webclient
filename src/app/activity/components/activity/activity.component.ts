import {
  AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output,
  ViewChild
} from '@angular/core';
import {SidebarComponent} from '../../../shared/components/sidebar/sidebar.component';
import {Activity} from '../../model/Activity_pb';
import {ActivitySidebarType} from '../../actions/activity.actions';
import {MessageEvent} from '../../../shared/utils';




@Component({
  selector: 'app-activity-module',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit, AfterViewChecked {


  @Input()
  private activity: Activity;
  @Input()
  public ActivitySport: string[];
  @Input()
  public ActivitySubSport: string[];
  @Input()
  public sidebarOpen: boolean;
  @Input()
  public sidebarContent: ActivitySidebarType;
  @Output()
  public messageEvent = new EventEmitter<MessageEvent<string | ActivitySidebarType>>();

  // declare activitySidebarType so it can be used in the template
  public activitySidebarTypes = ActivitySidebarType;

  // local variable for storing display page view in mobile
  public summaryDisplay = true;

  @ViewChild(SidebarComponent) sidebar;



  constructor(private cdRef: ChangeDetectorRef ) { }


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
    console.log('A RECEIVED EVENT: ' + $event.name + ' ' + $event.payload);
    switch ($event) {
      case 'closeSidebar': {
        this.messageEvent.emit(new MessageEvent('closeSidebar'));
        this.messageEvent.emit(new MessageEvent<ActivitySidebarType>('setSidebarContent', ActivitySidebarType.NoContent));
        return;
      }
      case 'minValue':
      case 'maxValue': {
        console.log('min / max filter emitted');
        // this.messageEvent.emit($event);
        return;
      }
      default: {
        this.messageEvent.emit($event);
      }
    }
  }







}
