import {Component, Input, OnInit} from '@angular/core';
import {Activity} from '../../../model/activity/Activity_pb';

@Component({
  selector: 'app-infographic',
  template: `
    <div class="card" style="background-color: lightskyblue; border-color: #333;">
    <div class="card-title text-center">
      <i class="fa" [ngClass]="icon" aria-hidden="true" ngbPopover="{{title}} {{uom}}" triggers="mouseenter:mouseleave"></i>
    </div>
    <div class="card-body">
    <ng-content></ng-content>
      <small class="card-subtitle mb-2 text-muted">{{uom}}</small>
    </div>
    </div>
  `,
  styleUrls: ['./infographic.component.css']
})
export class InfographicComponent {

  @Input()
  private title: string;

  @Input()
  private uom: string;

  @Input()
  private icon: string

  constructor() { }
}
