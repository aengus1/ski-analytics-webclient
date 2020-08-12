import gql from 'graphql-tag';
import {Injectable} from '@angular/core';
import {Apollo, Query} from 'apollo-angular';



@Injectable({
  providedIn: 'root'
})
export class GetUserGQL extends Query<any> {

  // constructor necessary due to this issue: https://github.com/kamilkisiela/apollo-angular/issues/1341
  constructor(apollo: Apollo) {
    super(apollo);
  }

  document = gql`
    query getUser{
      getUser{
        id
        height
        weight
        hrZones
        gender
        units_ddmm
        units_kms
        units_pace
        units_twelveHr
      }
    }
  `;
}
