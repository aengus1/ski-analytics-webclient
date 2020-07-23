import { Injectable } from '@angular/core';
import {ActivitySearchResult, Criteria, OrderInfo, PageInfo} from '../../../generated/graphql';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {Observable} from 'rxjs';

@Injectable()
export class SearchService {

  constructor(protected apollo: Apollo) {
  }

  public search(criteria: Criteria[], pagination: PageInfo, orderInfo: OrderInfo): ActivitySearchResult[] {
    const SearchActivities = gql`
      query searchActivities{
        searchActivities(predicates: criteria, pagination: pagination, order: orderInfo){
          id,
          activitySubType,
          activityType
        }
      }
    `;

      return this.apollo.query<any>({
      query: SearchActivities
    });

    return new Array<ActivitySearchResult>();
  }
}
