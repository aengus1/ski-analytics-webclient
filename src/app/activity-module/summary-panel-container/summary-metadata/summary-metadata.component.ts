import { Component, OnInit } from '@angular/core';
import {FetchActivityService} from '../../services/fetch-activity.service';
import {Activity} from '../../../model/Activity_pb';
import {TitleCasePipe} from '../../../pipes/titlecase.pipe';



@Component({
  selector: 'app-summary-metadata',
  templateUrl: './summary-metadata.component.html',
  styleUrls: ['./summary-metadata.component.css'],
  providers: [TitleCasePipe]
})
export class SummaryMetadataComponent implements OnInit {

  // todo -> move activity up to activitymodule component
  public activity: Activity;
  public  ActivitySport = [];
  public  ActivitySubSport = [];

  //
  // Activity_Sport: Activity.Sport;
  // seems ridiculous but required to use enum in template
  // https://www.gurustop.net/blog/2016/05/24/how-to-use-typescript-enum-with-angular2/


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
      data => {this.activity = data;
      },
      err => {console.log(err); }
    );
  }



}
