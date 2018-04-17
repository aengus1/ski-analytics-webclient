import { ActivityFilterType} from '../../model/activity-filter/activity-filter.model';
import {Activity} from '../../model/activity/Activity_pb';
import {AbstractActivityFilter} from '../filter/abstract-activity-filter';
import {MinMaxActivityFilter} from '../../model/activity-filter/min-max-activity-filter.model';

export class SpeedFilter extends AbstractActivityFilter implements MinMaxActivityFilter {
  id: string;
  type: ActivityFilterType;
  filteredIds: number[];
  active: boolean;
   _min: number;
  _max: number;

  constructor(private initialMin: number, private initialMax: number, id: string = 'speed') {
    super();
    this.type = ActivityFilterType.Speed;
    this.active = true;
    this._min = this.initialMin;
    this._max = this.initialMax;
    this.id = id;
  }


  /**
   * Apply the filter to the activity. Returns the filtered activity and a list of ids that were removed
   * @param {Activity} activity
   * @returns {[Activity , number[]]}
   */
  applyFilter(activity: Activity): [Activity, number[]] {
    console.log('hit apply filter method ');
    this.active = true;
    const filteredValues = activity.getValues().getSpeedList();
    const res = new Array<Array<number>>();

    for (let i = 0; i < filteredValues.length; i++) {
      res.push([filteredValues[i], i]);
    }
      const result = res.filter(v => (v[0] >= this._min && v[0] <= this._max));

    console.log('filteredValues = ' + result.map(v => v[1]));

    this.filteredIds = result.map( v => v[1]);
    super.filterAllValuesByIndex(activity, this.filteredIds);

    return [activity,  result.map( v => v[0])];

  }

  clear(): void {
    this._min = this.initialMin;
    this._max = this.initialMax;
    // this.active = false;
  }

   reHydrate(obj: Object) {
    const sf =  new SpeedFilter(obj['initialMin'], obj['initialMax']);
    sf._min = obj['_min'];
    sf._max = obj['_max'];
    sf.active = obj['active'];
      return sf;
  }
}
