import {Component,  OnInit} from '@angular/core';
import {Activity} from '../../model/Activity_pb';
import {TitleCasePipe} from '../../../shared/pipes/titlecase.pipe';
import {RemoveUnderscorePipe} from '../../../shared/pipes/remove-underscore.pipe';
import {IntervalPipe} from '../../../shared/pipes/interval.pipe';
import {MockActivityService} from '../../services/activity-service/mock.activity.service';


@Component({
  selector: 'app-summary-metadata',
  templateUrl: './summary-metadata.component.html',
  styleUrls: ['./summary-metadata.component.css'],
  providers: [TitleCasePipe, IntervalPipe, RemoveUnderscorePipe]
})
export class SummaryMetadataComponent implements OnInit {


  public activity: Activity;
  public ActivitySport: string[];
  public ActivitySubSport: string[];


  constructor(private activityService: MockActivityService) {
  }

  ngOnInit() {
      this.activityService.getActivity('1').subscribe(data => {
      this.activity = data;
    });

    this.ActivitySport = this.activityService.getActivitySport();
    this.ActivitySubSport = this.activityService.getActivitySubSport();


  }


}
