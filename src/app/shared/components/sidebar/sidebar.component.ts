
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Activity} from '../../../activity/model/activity/Activity_pb';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() panelOpen: boolean;
  @Output() messageEvent = new EventEmitter<string>();


  constructor() { }

  ngOnInit() {
  }


  close() {
    this.panelOpen = false;
    this.messageEvent.emit('closeSidebar');
  }

}

