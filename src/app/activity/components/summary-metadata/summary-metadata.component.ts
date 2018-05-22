import {Component, Input, OnInit} from '@angular/core';
import {Activity} from '../../model/activity/Activity_pb';
import {TitleCasePipe} from '../../../shared/pipes/titlecase.pipe';
import {RemoveUnderscorePipe} from '../../../shared/pipes/remove-underscore.pipe';
import {IntervalPipe} from '../../../shared/pipes/interval.pipe';
import {Observable} from 'rxjs/Observable';
import {select, Store} from '@ngrx/store';
import * as fromActivity from '../../reducers';


@Component({
  selector: 'app-summary-metadata',
  templateUrl: './summary-metadata.component.html',
  styleUrls: ['./summary-metadata.component.css'],
  providers: [TitleCasePipe, IntervalPipe, RemoveUnderscorePipe]
})
export class SummaryMetadataComponent implements OnInit {

@Input()
private activity$: Observable<Activity>;  // this is the UNFILTERED ACTIVITY!
  @Input()
  public ActivitySport: string[];
@Input()
  public ActivitySubSport: string[];


  constructor( private store: Store<fromActivity.State>) {
    this.activity$ = store.pipe(select(fromActivity.getSelectedActivity));
  }


  ngOnInit() {
    // console.log('activity' + this.activity.getId());
    // console.log('timer = ' + this.activity.getSummary().getTotaltimer());
    // console.log('this.activity' + this.activity.getId() + this.activity.getSummary().getStartts());
  }


}
