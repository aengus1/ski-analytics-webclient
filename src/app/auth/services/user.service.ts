import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(protected apollo: Apollo) {
  }


 public  getUserSettings(): Observable<any> {

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

    return this.apollo.watchQuery<any>({
      query: GetUserSettings,
    }).valueChanges;

    // .subscribe(({data, loading}) => {
    //   console.log('user = ... ' + JSON.stringify(data));
    // });

  }

  public  addUserSettings(): Observable<any> {

    const AddUserSettings = gql`
  mutation addUser{
				addUser(height: $height, weight: $weight, gender: $gender, hrZones: $hrZones){
            id
          height
          weight
          hrZones
          gender
        }
}
`;

    return this.apollo.mutate({
      mutation: AddUserSettings,
      variables: {
        height: -1,
        weight: -1,
        hrZones: [-1, -1, -1, -1, -1],
        gender: 'NA'
    }});

    // .subscribe(({data, loading}) => {
    //   console.log('user = ... ' + JSON.stringify(data));
    // });

  }

}
