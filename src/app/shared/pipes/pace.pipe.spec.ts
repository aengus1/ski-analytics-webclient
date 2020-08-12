import {PacePipe} from './pace.pipe';

describe('PacePipe', () => {

  it('trims extra decimal places', () => {
    const pipe = new PacePipe();
    expect(pipe.transform(20.00122, 'KM_PER_HOUR')).toEqual('20.00');
  });
  it('handles transform to metres per second', () => {
    const pipe = new PacePipe();
    expect(pipe.transform(24, 'METRES_PER_SECOND')).toEqual('6.67');
  });
  it('handles transform to miles per hour', () => {
    const pipe = new PacePipe();
    expect(pipe.transform(24, 'MILES_PER_HOUR')).toEqual('14.91');
  });
  it('handles transform to mins per km', () => {
    const pipe = new PacePipe();
    expect(pipe.transform(24, 'MINS_PER_KM')).toEqual('2.50');
  });
  it('handles transform to ft per second', () => {
    const pipe = new PacePipe();
    expect(pipe.transform(24, 'FT_PER_SECOND')).toEqual('21.87');
  });
  it('handles transform to mins per mile', () => {
    const pipe = new PacePipe();
    expect(pipe.transform(24, 'MINS_PER_MILE')).toEqual('4.02');
  });

  it('handles missing unit', () => {
    const pipe = new PacePipe();
    expect(pipe.transform(20.00122)).toEqual('20.00');
  });

  it('handles zero value', () => {
    const pipe = new PacePipe();
    expect(pipe.transform(0)).toEqual('0.00');
  });

  it('handles null and undefined values', () => {
    const pipe = new PacePipe();
    expect(pipe.transform(null)).toEqual('');
    expect(pipe.transform(undefined)).toEqual('');
  });
});
