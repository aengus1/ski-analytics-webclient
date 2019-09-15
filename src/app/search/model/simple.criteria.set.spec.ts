import {CriteriaItem} from './criteria.item';
import {SearchOperator} from './search.operator';
import {SearchValueDataType} from './searchvalue.datatypes';
import {Dictionary, SimpleCriteriaSet} from './simple.criteria.set';


describe('SimpleCriteriaSet', () => {


  it('should convert to valid json', () => {

    const testCriteria: CriteriaItem  = new CriteriaItem('id', SearchOperator.EQ, '123', SearchValueDataType.STRING);
    const testCriteria2: CriteriaItem  = new CriteriaItem('distance', SearchOperator.GT, '12', SearchValueDataType.INTEGER);

    const criteria: Dictionary<CriteriaItem> = {};
    criteria['id'] = testCriteria;
    criteria['distance'] = testCriteria2;


    const criteriaSet: SimpleCriteriaSet = new SimpleCriteriaSet(criteria);
    criteriaSet.name = '';

    const jsonResult = JSON.stringify(criteriaSet);
    const jsonExpected = {
      criteria:
        {
          'id' : {
            field: 'id',
            operator: 'EQ',
            value: '123',
            valueType: 'STRING'
          },
          'distance' : {
            field: 'distance',
            operator: 'GT',
            value: '12',
            valueType: 'INTEGER'
          }
        }
      ,
      _name: ''
    };
    expect(jsonResult).toEqual(JSON.stringify(jsonExpected));
  });

});
