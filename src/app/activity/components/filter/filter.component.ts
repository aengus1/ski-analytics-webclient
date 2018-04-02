import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-filter',
  template: `<div class="card" ngClass="{'bg-success': active, 'bg-light': !active}">
    <div class="card-header">
      <button type="button"
              (click)=""
              class="btn btn-sm btn-outline-danger float-right">
        clear</button>
      {{title}}
    </div>
    <div class="card-body">
      <ng-content></ng-content>
    </div>
  </div>`
})
export class FilterComponent implements OnInit {

  constructor() {
  }

  @Input()
  title: string;
  active = false;
  reset = false;


  ngOnInit() {
  }

  clear() {

  }


  receiveMessage($event) {
    switch ($event) {
      case 'filterActive': {
        this.active = $event.payload;
        return;
      }
    }

  }
}
