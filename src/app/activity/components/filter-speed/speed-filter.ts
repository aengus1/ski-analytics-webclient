import {ActivityFilter, ActivityFilterType} from '../../model/activity-filter.model';
import {Activity} from '../../model/Activity_pb';
import {AbstractActivityFilter} from '../filter/AbstractActivityFilter';

export class SpeedFilter extends AbstractActivityFilter {
  id: string;
  type: ActivityFilterType;
  filteredIds: number[];
  active: boolean;
   _min: number;
  public max: number;

  constructor(private initialMin: number, private initialMax: number) {
    super();
    this.id = 'speed';
    this.type = ActivityFilterType.Speed;
    this.active = false;
    this._min = this.initialMin;
    this.max = this.initialMax;
  }

  set min(min: number) {
    this._min = min;
  }

  get min() {
    return this._min;
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
      const result = res.filter(v => (v[0] >= this._min && v[0] <= this.max));

    console.log('filteredValues = ' + result.map(v => v[1]));

    this.filteredIds = result.map( v => v[1]);
    super.filterAllValuesByIndex(activity, this.filteredIds);

    return [activity,  result.map( v => v[0])];

  }

  clear(): void {
    this._min = this.initialMin;
    this.max = this.initialMax;
    this.active = false;
  }
}
