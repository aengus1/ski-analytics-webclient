import {ActivityFilter, ActivityFilterType} from '../../model/activity-filter/activity-filter.model';
import {Activity} from '../../model/activity/Activity_pb';

export abstract class AbstractActivityFilter implements ActivityFilter {

  id: string;
  type: ActivityFilterType;
  filteredIds: number[];

  /**
   * Apply the filter to the activity
   * @param {activity} the activity to filter
   * @returns {[Activity , number[]]} the filtered activity and a list of ids that were removed
   */
  abstract applyFilter(activity: Activity): number[];

  /**
   * reset the filter to it's initial values (i.e. inactivate the filter without removing it
   */
  abstract clear(): void;

  /**
   * convenience method to remove values from all of activity.getValues() value arrays
   * @param {Activity} activity the activity to filter
   * @param {number[]} indices the array indices to exclude
   */
  // TODO -> add all value types to this filter
  filterAllValuesByIndex(activity: Activity, indices: number[]) {
    activity.getValues().setSpeedList(this.filterByIndices(activity.getValues().getSpeedList(), indices));
    activity.getValues().setHrList(this.filterByIndices(activity.getValues().getHrList(), indices));
    activity.getValues().setTsList(this.filterByIndices(activity.getValues().getTsList(), indices));
    activity.getValues().setDistanceList(this.filterByIndices(activity.getValues().getDistanceList(), indices));
    // console.log('tslist = ' + activity.getValues().getTsList());
  }

  /**
   * rebuild a typescript class from a JSON representation of it
   * @param {Object} obj  JSON representation of the activity filter
   * @returns {ActivityFilter} typescript representation of the activity filter
   * (i.e. add the applyFilter and clear() methods)
   */
  abstract reHydrate(obj: Object): ActivityFilter;

  // insert a marker to represent gaps in series that have been filtered out.  This is required for aggregations
  // that do comparisons between contigious elements
  /**
   *
   * @param {number[]} values
   * @param {number[]} indices
   * @returns {number[]}
   */
  private insertFilterMarkersNumber(values: number[], indices: number[]): number[] {
    const len = values.length;
    // generate an array of all values from min to max
    const all: number[] = [];
    for (let i = 0; i < len; i++) {
      all.push(i);
    }
    // create a set of filtered indices
    const filtered = new Set(indices);
    // get difference
    const removed = all.filter(x => !filtered.has(x));

    // insert NaN where there is a filtered gap
    removed.forEach(x => values.splice(x, 0, NaN));

    // remove duplicate contigious NaN values
    return values.filter((x, p, a) => {
      return p === 0 || !isNaN(x) || (isNaN(x) !== isNaN(a[p - 1]));
    });
  }

  // insert a marker to represent gaps in series that have been filtered out.  This is required for aggregations
  // that do comparisons between contigious elements
  private insertFilterMarkersString(values: string[], indices: number[]): string[] {
    const len = values.length;
    // generate an array of all values from min to max
    const all: number[] = [];
    for (let i = 0; i < len; i++) {
      all.push(i);
    }
    // create a set of filtered indices
    const filtered = new Set(indices);
    // get difference
    const removed = all.filter(x => !filtered.has(x));

    // insert NaN where there is a filtered gap
    removed.forEach(x => values.splice(x, 0, 'marker'));

    // remove duplicate contigious NaN values
    return values.filter((x, p, a) => {
      return p === 0 || x !== 'marker' || ((x === 'marker') !== (a[p - 1] === 'marker'));
    });
  }

  private filterByIndices(values: any[], indices: number[]): any[] {
    if (values.length > 0 && typeof values[0] === 'number') {
      console.log('filtering ' + values[0] + ' as number');
      return this.insertFilterMarkersNumber(values.map((v, i) => [v, i])
        .filter(t => indices.includes(t[1]))
        .map((v) => v[0]), indices);
    }
  return this.insertFilterMarkersString(values.map((v, i) => [v, i])
.filter(t => indices.includes(t[1]))
.map((v) => v[0]), indices);
}
}
