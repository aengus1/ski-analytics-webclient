import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MessageEvent} from '../../../shared/utils';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() panelOpen: boolean;
  @Output() messageEvent = new EventEmitter<MessageEvent<string>>();


  constructor() { }

  ngOnInit() {
  }


  close() {
    this.panelOpen = false;
    this.messageEvent.emit(new MessageEvent('closeSidebar', '' ));
  }

}

