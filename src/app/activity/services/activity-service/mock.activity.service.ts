import {Injectable} from '@angular/core';
import {ActivityService} from './activity.service';
import {Activity} from '../../model/activity/Activity_pb';
import {map} from 'rxjs/operators';

@Injectable()
export class MockActivityService extends ActivityService {

  getActivity(id: string) {
    switch ( id ) {
      case '1': {
        return this.http.get('https://s3-us-west-2.amazonaws.com/www.ski-analytics.com/suunto_10.pb', {responseType: 'arraybuffer'})
          .pipe(map(res => {
            const activity =  Activity.deserializeBinary(new Uint8Array(res));
            // todo -> remove this from production code. just to test display as these values are not included in test data
            activity.getMeta().setSubsport(Activity.SubSport.CARDIO_TRAINING);
            activity.getMeta().setLocation('Knox Mountain Park, Kelowna, BC, V1P 1L7');
            activity.getValues().getTemperatureList()[0] = -4;
            return activity;
          }));
      }
      default: {
         return this.http.get( 'https://s3-us-west-2.amazonaws.com/www.ski-analytics.com/run280317_0.pb', {responseType: 'arraybuffer'})
           .pipe(map(res => {
            const activity =  Activity.deserializeBinary(new Uint8Array(res));
            // todo -> remove this from production code. just to test display as these values are not included in test data
            activity.getMeta().setSport(Activity.Sport.CROSS_COUNTRY_SKIING);
            activity.getMeta().setSubsport(Activity.SubSport.INDOOR_SKIING);
            activity.getMeta().setLocation('Goldbar, Edmonton');
            activity.getValues().getTemperatureList()[0] = -4;
            return activity;
          }));

      }
    }
    // return this.http.get( 'https://s3-us-west-2.amazonaws.com/www.ski-analytics.com/run280317_0.pb', {responseType: 'arraybuffer'})

  }

}
