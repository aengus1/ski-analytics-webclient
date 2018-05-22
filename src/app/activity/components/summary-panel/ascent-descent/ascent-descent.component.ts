import {Component, Input, OnInit} from '@angular/core';
import {Activity} from '../../../model/activity/Activity_pb';

@Component({
  selector: 'app-ascent-descent',
  template: `
    <div class="row">
    <div class="col-md-6">
      <span class="font-weight-bold" id="ascentNum">{{getAscent()}} {{uom}}</span>
      <div id="upArrow" *ngIf="getAscent() > 0">
      <svg [attr.width]="calcUpArrowScale()" [attr.height]="calcUpArrowScale()" viewBox="0 0 60 60">
        <svg:path d="M 25 5 L 45 20 L 35 20 L 35 55 L 15 55 L 15 20 L 5 20 Z"/>
      </svg>
      </div>
    </div>
      <div class="col-md-6">
        <span class="font-weight-bold" id="descentNum">{{getDescent()}} {{uom}}</span>
        <div id="downArrow" *ngIf="getDescent() > 0">
        <svg [attr.width]="calcDownArrowScale()" [attr.height]="calcDownArrowScale()" viewBox="0 0 60 60">
          <svg:path d="M 15 5 L 35 5 L 35 40 L 45 40 L 25 55 L 5 40 L 15 40 Z"/>
        </svg>
        </div>
      </div>
  </div>
    <!--<div class="row">-->
      <!--<div class="col-md-6">-->
        <!--<small>-->
        <!--{{getAscentRate() | number : '1.0-0'}} {{''+uomRate }}-->
        <!--</small>-->
      <!--</div>-->
      <!--<div class="col-md-6">-->
        <!--<small>-->
       <!--{{getDescentRate() | number : '1.0-0'}} {{''+uomRate }}-->
        <!--</small>-->
      <!--</div>-->
    <!--</div>-->
  `,
  styleUrls: ['./ascent-descent.component.css']
})
export class AscentDescentComponent implements OnInit {

  @Input()
  private activity: Activity;

  @Input()
  private uom: string;

  @Input()
  private uomRate: string;

  @Input()
  private mobile = false;

  getAscent() {
    return this.activity.getSummary().getTotalascent();
  }

  getDescent() {
    return this.activity.getSummary().getTotaldescent();
  }

  getAscentRate() {
    return this.activity.getSummary().getTotalascent() / (this.activity.getSummary().getTotalasctime() / 60);
  }

  getDescentRate() {
    return this.activity.getSummary().getTotaldescent() / (this.activity.getSummary().getTotaldesctime() / 60);
  }

  calcUpArrowScale() {
    if (this.getDescent() === 0) {
      return this.mobile ? '40%' : '100%';
    }
   if (this.getAscent() > this.getDescent()) {
     return this.mobile ? '40%' : '100%';
   }
   return ((this.getAscent() / this.getDescent()) * (this.mobile ? 40 : 100)).toFixed(1) + '%';
  }

  calcDownArrowScale() {
    if (this.getAscent() === 0) {
      return this.mobile ? '40%' : '100%';
    }
    if (this.getDescent() > this.getAscent()) {
      return this.mobile ? '40%' : '100%';
    }
    return ((this.getDescent() / this.getAscent()) * (this.mobile ? 40 : 100)).toFixed(1) + '%';
  }

  constructor() { }

  ngOnInit() {
  }

}
