import {SearchOperator} from './search.operator';
import {SearchValueDataType} from './searchvalue.datatypes';

export class CriteriaItem {

  private field: string;
  private operator: SearchOperator;
  private value: string;
  private valueType: SearchValueDataType;

  public constructor(field: string, operator: SearchOperator, value: string, valueType: SearchValueDataType) {
    this.field = field;
    this.operator = operator;
    this.value = value;
    this.valueType = valueType;
  }

}
