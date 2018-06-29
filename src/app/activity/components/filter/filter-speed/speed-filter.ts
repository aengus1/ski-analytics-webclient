import {ActivityFilterType} from '../../../model/activity-filter/activity-filter.model';
import {Activity} from '../../../model/activity/Activity_pb';
import {AbstractActivityFilter} from '../abstract-activity-filter';
import {MinMaxActivityFilter} from '../../../model/activity-filter/min-max-activity-filter.model';
import * as _ from 'lodash';

export class SpeedFilter extends AbstractActivityFilter implements MinMaxActivityFilter {
  id: string;
  type: ActivityFilterType;
  filteredIds: number[];
   _min: number;
  _max: number;
  initialMax: number;
  initialMin: number;

  /**
   * @param {number} initialMin represents existing state of this filter's min value
   * @param {number} initialMax represents existing state of this filter's max value
   * @param {string} id a unique identifier for this filter
   */
  constructor(initialMin: number = 0, initialMax: number = 0, id: string = 'speed') {
    super();
      this.type = ActivityFilterType.Speed;
      this._min = initialMin;
      this._max = initialMax;
      this.id = id;
      this.initialMin = initialMin;
      this.initialMax = initialMax;
  }

  /**
   * copy constructor - required because serialization strips methods
   * @param {SpeedFilter} filter
   * @returns {SpeedFilter}
   */
  static fromSpeedFilter(filter: SpeedFilter): SpeedFilter {
    const sf: SpeedFilter = new SpeedFilter();
    sf.type = filter.type;
    sf._min = filter._min ? filter._min : filter.initialMin;
    sf._max = filter._max ? filter._max : filter.initialMax;
    sf.initialMin = filter.initialMin;
    sf.initialMax = filter.initialMax;
    sf.filteredIds = filter.filteredIds;
    return sf;
  }


  /**
   * Apply the filter to the activity
   * @param {Activity} activity
   * @returns number[] the list of remaining value ids
   */
  findRemainingIndices(activity: Activity): number[] {

      // console.log('applying filter' + JSON.stringify(this) + ' to ' + activity.getValues().getSpeedList());
    const filteredValues = _.cloneDeep(activity.getValues().getSpeedList());
    const res = new Array<Array<number>>();

    for (let i = 0; i < filteredValues.length; i++) {
      res.push([filteredValues[i], i]);
    }
      const result = res.filter(v => {
        return ( (v[0] >= +this._min && v[0] <= +this._max));
      });
    this.filteredIds = result.map( v => v[1]);

    // AbstractActivityFilter.filterAllValuesByIndex(activity, this.filteredIds);



    // console.log('returning ' + result.map( v => v[1]));
    return result.map( v => v[1]);
  }

  clear(): void {
    this._min = this.initialMin;
    this._max = this.initialMax;
  }

    reHydrate(obj: Object) {
    const sf: SpeedFilter = <SpeedFilter>obj;
    return SpeedFilter.fromSpeedFilter(sf);
    }
//
// return SpeedFilter.fromSpeedFilter(obj);    console.log('object = ' +  Object.getOwnPropertyNames(obj));
//     console.log('initial min = ' + obj['initialMin']);
//     this.initialMin = obj['initialMin'];
//     this.initialMax = obj['initialMax'];
//     this._min = +obj['_min'];
//     this._max = +obj['_max'];
//     this.active = obj['active'];
//     this.id = obj['id'];
//       return this;
//   }
}
