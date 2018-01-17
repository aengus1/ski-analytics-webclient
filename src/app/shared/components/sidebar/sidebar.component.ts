
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() panelOpen: boolean;
  @Input() filterOpen: boolean;
  @Input() attributeOpen: boolean;
  @Output() messageEvent = new EventEmitter<string>();


  constructor() { }

  ngOnInit() {
  }
  openFilter() {
    this.attributeOpen = false;
    this.filterOpen = true;
  }

  closeFilter() {
    this.filterOpen = false;
  }

  openAttribute() {
    this.filterOpen = false;
    this.attributeOpen = true;
  }

  closeAttribute() {
    this.attributeOpen = false;
  }

  close() {
    this.closeAttribute();
    this.closeFilter();
    this.panelOpen = false;
    this.messageEvent.emit('closeSidebar');
  }

}
