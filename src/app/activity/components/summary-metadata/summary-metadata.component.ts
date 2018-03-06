import {Component, Input, OnInit} from '@angular/core';
import {Activity} from '../../model/Activity_pb';
import {TitleCasePipe} from '../../../shared/pipes/titlecase.pipe';
import {RemoveUnderscorePipe} from '../../../shared/pipes/remove-underscore.pipe';
import {IntervalPipe} from '../../../shared/pipes/interval.pipe';
import {MockActivityService} from '../../services/activity-service/mock.activity.service';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'app-summary-metadata',
  templateUrl: './summary-metadata.component.html',
  styleUrls: ['./summary-metadata.component.css'],
  providers: [TitleCasePipe, IntervalPipe, RemoveUnderscorePipe]
})
export class SummaryMetadataComponent implements OnInit {


@Input()
private activity: Activity;
@Input()
  public ActivitySport: string[];
@Input()
  public ActivitySubSport: string[];


  constructor(private activityService: MockActivityService) {
  }

  ngOnInit() {
  }


}
