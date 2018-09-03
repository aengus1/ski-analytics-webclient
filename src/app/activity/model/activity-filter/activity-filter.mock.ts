import {ActivityFilter} from './activity-filter.model';
import {SpeedFilter} from '../../components/filter/filter-speed/speed-filter';
import {Dictionary} from '@ngrx/entity/src/models';
import {HrzoneFilter} from '../../components/filter/filter-hrzone/hrzone-filter';


export class MockActivityFilter {

  public static generateMockSpeedFilter(): SpeedFilter {

    return new SpeedFilter(0, 10, 'speed');
  }

  public static generateMockHrZoneFilter(): HrzoneFilter {

    const f = new HrzoneFilter([false, false, true, true, true], 'hr');
    f.setUserZoneBoundaries([120, 140, 150, 170]);
    return f;
  }

  public static generateMockSpeedFilter2(): SpeedFilter {

    return new SpeedFilter(3, 6, 'speed');
  }



  public static generateMockFilterDictionary(): Dictionary<ActivityFilter> {

    const sfOne =  new SpeedFilter(0, 10, 'sfOne');
    const sfTwo =  new SpeedFilter(5, 3, 'sfTwo');
    const sfThree =  new SpeedFilter(-7, 4, 'sfThree');

    return {'sfOne': sfOne, 'sfTwo': sfTwo, 'sfThree': sfThree};
  }

  public static generateMockFilterDictionary2(): Dictionary<ActivityFilter> {

    const sfOne =  MockActivityFilter.generateMockSpeedFilter2();

    return {'speed': sfOne};
  }



}
