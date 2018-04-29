import {ActivityFilter} from './activity-filter.model';
import {SpeedFilter} from '../../components/filter-speed/speed-filter';
import {Dictionary} from '@ngrx/entity/src/models';


export class MockActivityFilter {

  public static generateMockSpeedFilter(): SpeedFilter {

    return new SpeedFilter(0, 10, 'speed');
  }



  public static generateMockFilterDictionary(): Dictionary<ActivityFilter> {

    const sfOne =  new SpeedFilter(0, 10, 'sfOne');
    const sfTwo =  new SpeedFilter(5, 3, 'sfTwo');
    const sfThree =  new SpeedFilter(-7, 4, 'sfThree');

    return {'sfOne': sfOne, 'sfTwo': sfTwo, 'sfThree': sfThree};
  }



}
