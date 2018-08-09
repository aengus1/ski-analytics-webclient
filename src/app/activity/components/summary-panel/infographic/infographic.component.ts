import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-infographic',
  template:
    `<div  class="card" style="background-color: lightskyblue; border-color: #333;">
    <div class="card-title text-center">
      <i class="fa"
      [ngClass]="icon"
         aria-hidden="true"
         ngbPopover="{{description}}"
         popoverTitle="{{title}} ({{uom}})"
         placement="right" container="body" triggers="mouseenter:mouseleave">
      <span class="text-body font-weight-bold">&nbsp;{{title}}</span>
      </i>
    </div>
    <div class="card-body">
    <ng-content></ng-content>
      <!--<small class="card-subtitle mb-2 text-muted pull-right">{{uom}}</small>-->
    </div>
    </div>
  `,
  styleUrls: ['./infographic.component.css']
})
export class InfographicComponent {

  @Input()
  public title: string;

  @Input()
  public description = '';

  @Input()
  public uom: string;

  @Input()
  public icon: string;

  constructor() { }
}
