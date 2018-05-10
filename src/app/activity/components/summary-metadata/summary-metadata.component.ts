import {Component, Input, OnInit} from '@angular/core';
import {Activity} from '../../model/activity/Activity_pb';
import {TitleCasePipe} from '../../../shared/pipes/titlecase.pipe';
import {RemoveUnderscorePipe} from '../../../shared/pipes/remove-underscore.pipe';
import {IntervalPipe} from '../../../shared/pipes/interval.pipe';



@Component({
  selector: 'app-summary-metadata',
  templateUrl: './summary-metadata.component.html',
  styleUrls: ['./summary-metadata.component.css'],
  providers: [TitleCasePipe, IntervalPipe, RemoveUnderscorePipe]
})
export class SummaryMetadataComponent implements OnInit {

@Input()
private activity: Activity;  // this is the UNFILTERED ACTIVITY!
@Input()
  public ActivitySport: string[];
@Input()
  public ActivitySubSport: string[];


  constructor() {
  }

  ngOnInit() {
  }


}
