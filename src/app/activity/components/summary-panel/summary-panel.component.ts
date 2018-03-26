import {Component, Input, OnInit} from '@angular/core';
import {Activity} from '../../model/Activity_pb';

@Component({
  selector: 'app-summary-panel',
  templateUrl: './summary-panel.component.html',
  styleUrls: ['./summary-panel.component.css']
})
export class SummaryPanelComponent {


  @Input()
  private activity: Activity;
  @Input()
  public ActivitySport: string[];
  @Input()
  public ActivitySubSport: string[];

  constructor() {

  }
}
