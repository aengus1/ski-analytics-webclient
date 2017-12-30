import { Component, OnInit } from '@angular/core';
import {FetchActivityService} from '../../services/fetch-activity.service';
import {Activity} from '../../../model/Activity_pb';
import {TitleCasePipe} from '../../../pipes/titlecase.pipe';
import {RemoveUnderscorePipe} from '../../../pipes/remove-underscore.pipe';
import {IntervalPipe} from '../../../pipes/interval.pipe';



@Component({
  selector: 'app-summary-metadata',
  templateUrl: './summary-metadata.component.html',
  styleUrls: ['./summary-metadata.component.css'],
  providers: [TitleCasePipe, IntervalPipe, RemoveUnderscorePipe ]
})
export class SummaryMetadataComponent implements OnInit {

  // todo -> move activity up to activitymodule component
  public activity: Activity;
  public  ActivitySport = [];
  public  ActivitySubSport = [];


  constructor(private activityService: FetchActivityService ) { }

  ngOnInit() {

    // this mapping reversal needs to be done on all proto enum types

    let i = 0;
    for (const v in Activity.Sport) {
      this.ActivitySport[i++] = v;
    }
    i = 0;
    for (const v in Activity.SubSport) {
      this.ActivitySubSport[i++] = v;
    }

    this.activityService.getActivity().subscribe(
      data => {
        this.activity = data;
        // todo -> remove this from production code. just to test display as these values are not included in test data
        this.activity.getMeta().setSubsport(Activity.SubSport.CARDIO_TRAINING);
        this.activity.getMeta().setLocation('Goldbar, Edmonton');
        this.activity.getValues().getTemperatureList()[0] = -4;

      },
      err => {console.log(err); }
    );
  }


}
