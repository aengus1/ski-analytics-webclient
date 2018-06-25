import {ActivityFilter, ActivityFilterType} from '../../model/activity-filter/activity-filter.model';
import {Activity} from '../../model/activity/Activity_pb';

export abstract class AbstractActivityFilter implements ActivityFilter {

  id: string;
  type: ActivityFilterType;
  filteredIds: number[];

  /**
   * convenience method to remove values from all of activity.getValues() value arrays
   * @param {Activity} activity the activity to filter
   * @param {number[]} indices the array indices to exclude
   */
  // TODO -> add all value types to this filter
  public static filterAllValuesByIndex(activity: Activity, indices: number[]) {
    activity.getValues().setSpeedList(AbstractActivityFilter.filterByIndices(activity.getValues().getSpeedList(), indices));
    activity.getValues().setHrList(AbstractActivityFilter.filterByIndices(activity.getValues().getHrList(), indices));
    activity.getValues().setTsList(AbstractActivityFilter.filterByIndices(activity.getValues().getTsList(), indices));
    activity.getValues().setDistanceList(AbstractActivityFilter.filterByIndices(activity.getValues().getDistanceList(), indices));
    activity.getValues().setAltitudeList(AbstractActivityFilter.filterByIndices(activity.getValues().getAltitudeList(), indices));
    // console.log('tslist = ' + activity.getValues().getTsList());
  }

  /**
   * Inserts markers into the filtered value array so it is possible to identify gaps - important for aggregate calculations
   * @param {number[]} values  filtered value array but without markers
   * @param {number[]} indices indices of values in original array
   * * @param {number} valueLen length of original (unfiltered) value array
   * @returns {number[]}
   */
  private static insertFilterMarkersNumber(values: number[], indices: number[], valuesLen: number): number[] {
    // generate an array of all values from min to max
    const all: number[] = [];
    for (let i = 0; i < valuesLen; i++) {
      all.push(i);
    }

    // create a set of filtered indices
    const filtered = new Set(indices);
    // get difference
    const removed = all.filter(x => !filtered.has(x));

    // insert NaN where there is a filtered gap
    removed.forEach((x)  => values.splice(x, 0, NaN));

    // remove duplicate contigious NaN values
    return values.filter((x, p, a) => {
      return p === 0 || !isNaN(x) || (isNaN(x) !== isNaN(a[p - 1]));
    });

  }

  // insert a marker to represent gaps in series that have been filtered out.  This is required for aggregations
  // that do comparisons between contigious elements
  private static insertFilterMarkersString(values: string[], indices: number[], valuesLen: number): string[] {

    // generate an array of all values from min to max
    const all: number[] = [];
    for (let i = 0; i < valuesLen; i++) {
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

  private static filterByIndices(values: any[], indices: number[]): any[] {
    const valuesLen = values.length;
    if (values.length > 0 && typeof values[0] === 'number') {
      return AbstractActivityFilter.insertFilterMarkersNumber(
        values.map((v, i) => [v, i])  // map to value-index pair
        .filter(t => indices.includes(t[1]))  // filter to only values included in 'indices'
        .map((v) => v[0]) // map back to values
        , indices, valuesLen);
    }
    return AbstractActivityFilter.insertFilterMarkersString(values.map((v, i) => [v, i])
      .filter(t => indices.includes(t[1]))
      .map((v) => v[0]), indices, valuesLen);
  }

  /**
   * Runs the filter and returns the indices of the values that remain. Essentially this does the 'find' part of the filter
   * without actually applying it
   * @param {activity} the activity to filter
   * @returns {[Activity , number[]]} the filtered activity and a list of ids that were removed
   */
  abstract findRemainingIndices(activity: Activity): number[];

  /**
   * reset the filter to it's initial values (i.e. inactivate the filter without removing it
   */
  abstract clear(): void;

  /**
   * rebuild a typescript class from a JSON representation of it
   * @param {Object} obj  JSON representation of the activity filter
   * @returns {ActivityFilter} typescript representation of the activity filter
   * (i.e. add the applyFilter and clear() methods)
   */
  abstract reHydrate(obj: Object): ActivityFilter;

  // insert a marker to represent gaps in series that have been filtered out.  This is required for aggregations
  // that do comparisons between contigious elements
}
