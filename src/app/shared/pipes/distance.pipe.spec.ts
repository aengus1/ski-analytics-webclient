import {DistancePipe} from './distance.pipe';

describe('DistancePipe', () => {
  it('handles regular transform to km', () => {
    const pipe = new DistancePipe();
    expect(pipe.transform(6000, 'km')).toEqual('6.00');
  });

  it('handles regular transform to miles', () => {
    const pipe = new DistancePipe();
    expect(pipe.transform(8000, 'miles')).toEqual('4.97');
  });

  it('handles missing unit', () => {
    const pipe = new DistancePipe();
    expect(pipe.transform(6000)).toEqual('6.00');
  });

  it('handles zero value', () => {
    const pipe = new DistancePipe();
    expect(pipe.transform(0)).toEqual('0.00');
  });

  it('handles null and undefined values', () => {
    const pipe = new DistancePipe();
    expect(pipe.transform(null)).toEqual('');
    expect(pipe.transform(undefined)).toEqual('');
  });
});
