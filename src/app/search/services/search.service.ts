import { Injectable } from '@angular/core';
import {ActivitySearchResult, Criteria, Maybe, OrderInfo, PageInfo, Scalars} from '../../../generated/graphql';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {Observable} from 'rxjs';

@Injectable()
export class SearchService {

  constructor(protected apollo: Apollo) {
  }

  public search(criteria: Criteria[], pagination: PageInfo, orderInfo: OrderInfo): ActivitySearchResult[] {

    // // mutation saveHeight($userId: ID!, $height: Int!) {
    // //   saveHeight(id: $userId, height: $height) {
    //
    //
    //   return this.apollo.query<any>({
    //   query: SearchActivities
    // });
  console.log('SEARCH SERVICE CALLED');
    const dummyResult: ActivitySearchResult  = {
      id: 'test123',
      activityType: 'XC_SKIING',
      activitySubType: 'SKATE',
      ascent: 100,
      descent: 200,
      maxHr: 160,
      avHr: 110,
      duration: 50,
      distance: 100,
      maxSpeed: 20,
      avSpeed: 10,
      device: 'applewatch',
      date: '20200731',
      lastUpdate: '20200730'
    };

    const res: Array<ActivitySearchResult>  = new Array<ActivitySearchResult>();
    res.push(dummyResult);

    return res;
  }
}

// const SearchActivities = gql`
//   query searchActivities{
//     searchActivities(predicates: [Criteria], pagination: PageInfo, order: OrderInfo){
//       id,
//       activitySubType,
//       activityType
//     }
//   }
// `;
