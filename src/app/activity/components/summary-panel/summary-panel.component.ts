import {Component, Input} from '@angular/core';
import {Activity} from '../../model/activity/Activity_pb';

@Component({
  selector: 'app-summary-panel',
  templateUrl: './summary-panel.component.html',
  styleUrls: ['./summary-panel.component.scss']
})
export class SummaryPanelComponent {


 @Input()
  public activity: Activity;
  @Input()
  public ActivitySport: string[];
  @Input()
  public ActivitySubSport: string[];

  constructor() {

  }


}
