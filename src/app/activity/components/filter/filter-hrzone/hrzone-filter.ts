import {ActivityFilterType} from '../../../model/activity-filter/activity-filter.model';
import {Activity} from '../../../model/activity/Activity_pb';
import {AbstractActivityFilter} from '../abstract-activity-filter';
import * as _ from 'lodash';

export class HrzoneFilter extends AbstractActivityFilter {
  id: string;
  type: ActivityFilterType;
  filteredIds: number[];
  initialZones: boolean[];  // [0] = state of zone 1  (0 = filter off, 1 = filter on) [1] = state of zone 2, etc

  /**
   * userZoneBoundaries represents hr zone boundaries of current user.
   * e.g. [0] = upper bound of z1, [3] = lower bound of z 5
   */
  private userZoneBoundaries: number[];
  /**
   * @param {number[]} initialZones current state of filter
   * @param {string} id unique id for this filter type
   */
  constructor(initialZones = [false, false, false, false, false], id: string = 'hrzone') {
    super();
    this.type = ActivityFilterType.HrZone;
    this.initialZones = initialZones;
    this.userZoneBoundaries = [0 , 0, 0, 0, 0];
    this.id = id;
  }

  /**
   * copy constructor - required because serialization strips methods
   * @param {SpeedFilter} filter
   * @returns {SpeedFilter}
   */
  static fromHrZoneFilter(filter: HrzoneFilter): HrzoneFilter {
    const hrf: HrzoneFilter = new HrzoneFilter();
    hrf.type = filter.type;
    hrf.initialZones = filter.initialZones;
    hrf.filteredIds = filter.filteredIds;
    hrf.userZoneBoundaries = filter.userZoneBoundaries;
    return hrf;
  }

  setUserZoneBoundaries(zboundaries: number[]) {
    this.userZoneBoundaries = zboundaries;
  }

  /**
   * Apply the filter to the activity
   * @param {Activity} activity
   * @returns number[] the list of remaining value ids
   */
  findRemainingIndices(activity: Activity): number[] {

    // console.log('applying filter' + JSON.stringify(this) + ' to ' + activity.getValues().getSpeedList());
    const filteredValues = _.cloneDeep(activity.getValues().getHrList());
    const res = new Array<Array<number>>();

    for (let i = 0; i < filteredValues.length; i++) {
      res.push([filteredValues[i], i]);
    }

    /**
     * map each point to it's corresponding HR zone
     * @type {(number | number)[]}
     */
    const zone = res.map(v => {
      if (v[0] < this.userZoneBoundaries[0]) {
        return 1;
      }
      let i = 0;
      while (i++ < 4) {
        if (v[0] >= this.userZoneBoundaries[i - 1] && v[0] < this.userZoneBoundaries[i]) {
          return i + 1;
        }
      }
      if (v[0] >= this.userZoneBoundaries[3]) {
        return 5;
      }
    });

    /**
     * filter value if it's corresponding HR zone is filtered
     * @type {Array<number>[]}
     */
    const result = res.filter((v, ix) => {
      let j = 0;
      let keep = true;
      for (j = 0; j < this.initialZones.length; j++) {
        if (zone[ix] === j + 1 && this.initialZones[j] === true) {
          keep = false;
          break;
        }
      }
     return keep;
    });

    this.filteredIds = result.map( v => v[1]);

    return result.map( v => v[1]);
  }

  clear(): void {
    this.initialZones = [false, false, false, false, false];
  }

  reHydrate(obj: Object) {
    const sf: HrzoneFilter = <HrzoneFilter>obj;
    return HrzoneFilter.fromHrZoneFilter(sf);
  }
}
