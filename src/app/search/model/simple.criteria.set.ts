import {CriteriaItem} from './criteria.item';


export interface Dictionary<T> {
  [Key: string]: T;
}

export class SimpleCriteriaSet {

  private _name: string;
  private criteria: Dictionary<CriteriaItem>;

  public constructor(criteria: Dictionary<CriteriaItem>) {
    this.criteria = criteria;
  }

  get name() {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

}

