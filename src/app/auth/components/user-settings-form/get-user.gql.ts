import gql from 'graphql-tag';
import {Injectable} from '@angular/core';
import {Query} from 'apollo-angular';
import {Maybe, User} from '../../../../generated/graphql';



@Injectable({
  providedIn: 'root'
})
export class GetUserGQL extends Query<any> {
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
