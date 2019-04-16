import {Component, Input} from '@angular/core';
import {Activity} from '../../model/activity/Activity_pb';
import {TitleCasePipe} from '../../../shared/pipes/titlecase.pipe';
import {RemoveUnderscorePipe} from '../../../shared/pipes/remove-underscore.pipe';
import {IntervalPipe} from '../../../shared/pipes/interval.pipe';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromActivity from '../../reducers';
import WeatherIcon = Activity.WeatherIcon;

@Component({
  selector: 'app-summary-metadata',
  templateUrl: './summary-metadata.component.html',
  styleUrls: ['./summary-metadata.component.css'],
  providers: [TitleCasePipe, IntervalPipe, RemoveUnderscorePipe]
})
export class SummaryMetadataComponent {

@Input()
public activity$: Observable<Activity>;  // this is the UNFILTERED ACTIVITY!
  @Input()
  public ActivitySport: string[];
@Input()
  public ActivitySubSport: string[];


  constructor( private store: Store<fromActivity.State>) {
    this.activity$ = store.pipe(select(fromActivity.getUnfiltered));
  }

  private getWeatherIcon(value: WeatherIcon): string[] {

    switch (value) {
      case WeatherIcon.CLEAR_DAY:
        return ['sunny', 'day'];
      case WeatherIcon.CLEAR_NIGHT:
        return ['clear', 'night'];
      case WeatherIcon.RAIN_ICON:
        return ['rain', 'day'];
      case WeatherIcon.SNOW_ICON:
        return ['snow', 'day'];
      case WeatherIcon.FOG:
        return ['fog', 'day'];
      case WeatherIcon.SLEET_ICON:
        return ['sleet', 'day'];
      case WeatherIcon.PARTLY_CLOUDY_DAY:
        return ['cloudy', 'day'];
      case WeatherIcon.PARTLY_CLOUDY_NIGHT:
        return ['cloudy', 'night'];
      case WeatherIcon.NA_ICON:
        return ['na', ''];
    }

}


}
