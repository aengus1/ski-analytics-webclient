import * as fromSearch from './search.reducer';
import {reducer} from './search.reducer';
import {ActivitySearchResult, Criteria, DataType, Maybe, Operator, OrderInfo, PageInfo, Scalars} from '../../../generated/graphql';

describe('Search Reducer', () => {

  const searchResults: ActivitySearchResult[] = new Array<ActivitySearchResult>();

  const initState: fromSearch.State = {
    searchResults: new Array<ActivitySearchResult>(),
    ids: [],
    entities: null
  };

  it('should return the default state', () => {
    const action = {} as any;
    const result = reducer(undefined, action);
    (<any>expect(result)).toMatchSnapshot();
  });

  // it('should call search service when search request is made', () => {
  //   const criteria: Criteria[] = [
  //     {
  //       name: 'test',
  //       value: 'MYTEST',
  //       operator: Operator.Eq,
  //       type: DataType.String
  //     }
  //   ];
  //
  //   const pageInfo: PageInfo = {
  //     pageSize: 40,
  //     pageNumber: 1
  //   };
  //   const order: OrderInfo = {
  //     attribute: 'test',
  //     asc: true
  //   };
  //   const action = new SearchRequest(criteria, pageInfo, order);
  //   const result = reducer(initState, action);
  //   expect(result.searchResults.length
  //   expect(Object.keys(result.entities).length).toEqual(1, 'entities dictionary should not be empty');
  //   expect(result.ids.length).toEqual(1, 'id array should not be empty');
  //   console.log(result.entities[result.selectedActivityId]);
  //   expect(result).toEqual(activity, 'unfiltered activity is not the same as the loaded activity ');
  //
  // });



});


