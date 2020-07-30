import { Injectable } from '@angular/core';
import {ActivitySearchResult, Criteria, Maybe, OrderInfo, PageInfo, Scalars} from '../../../generated/graphql';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class SearchService {

  constructor(protected apollo: Apollo) {
  }

  private searchActivitiesQuery = gql`
    query searchActivities($predicates: [Criteria]!, $pagination: PageInfo, $order: OrderInfo) {
      searchActivities(predicates: $predicates, pagination: $pagination, order: $order) {
        id,
        activityType,
        activitySubType,
        ascent,
        avHr,
        avSpeed,
        date,
        distance,
        duration,
        lastUpdate,
        maxHr,
        maxSpeed
      }
    }
  `;

  public search(criteria: Criteria[], pagination: PageInfo, orderInfo: OrderInfo): Observable<ActivitySearchResult[]> {

    console.log('criteria = ' + JSON.stringify(criteria));
    console.log('pagination = ' + JSON.stringify(pagination));
    console.log('orderInfo = ' + JSON.stringify(orderInfo));
   return this.apollo.query<ActivitySearchResult[]>({
     query: this.searchActivitiesQuery,
     variables: {
       predicates: criteria,
       pagination: pagination,
       order: orderInfo
     }
   }).pipe(map(x => x.data));
    // console.log('SEARCH SERVICE CALLED');
    // const dummyResult: ActivitySearchResult = {
    //   id: 'test123',
    //   activityType: 'XC_SKIING',
    //   activitySubType: 'SKATE',
    //   ascent: 100,
    //   descent: 200,
    //   maxHr: 160,
    //   avHr: 110,
    //   duration: 50,
    //   distance: 100,
    //   maxSpeed: 20,
    //   avSpeed: 10,
    //   device: 'applewatch',
    //   date: '20200731',
    //   lastUpdate: '20200730'
    // };
    //
    // const res: Array<ActivitySearchResult> = new Array<ActivitySearchResult>();
    // res.push(dummyResult);
    //
    //
    // return res;
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
}
