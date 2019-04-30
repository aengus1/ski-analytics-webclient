import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(protected apollo: Apollo, protected authService: AuthService) {
  }


 public  getUserSettings(): void {

    const userId = JSON.parse(sessionStorage.getItem('userId')).signInUserSession.idToken.payload['cognito:username'];
    const GetUserSettings = gql`
  query getUser{
				getUser{
          id
          height
          weight
          hrZones
          gender
        }
}
`;

    this.apollo.watchQuery<any>({
      query: GetUserSettings,
    }).valueChanges.subscribe(({data, loading}) => {
      console.log('user = ... ' + JSON.stringify(data));
    });

  }

  //
  //     resultUserSettings$ = this.http.post(
  //       environment.graphql,
  //       {
  //         responseType: 'arraybuffer'
  //       })
  //       .pipe(map(res => Activity.deserializeBinary(new Uint8Array(res)))).pipe(map(v => {
  //         // hack for demo activity
  //         if (v.getId() === undefined || v.getId() == null) {
  //           v.setId('1');
  //         }
  //         v.getValues().setTemperatureList([-21, -22]);
  //         const res = [];
  //         ActivitySummaryService.summarizeActivity(v, null, v, fromActivity.buildTsLookupMap(v));
  //         return v;
  //       }));
  //     console.log('setting session key = ' + this.sessionKey);
  //   } catch (e) {
  //     console.log('failed to set session key');
  //   }
  //
  //   return resultActivity$;
  // }
}
