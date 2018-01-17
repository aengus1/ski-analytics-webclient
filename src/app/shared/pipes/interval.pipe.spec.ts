import { IntervalPipe } from './interval.pipe';

describe('IntervalPipe', () => {
  it('handles leading zeroes', () => {
    const pipe = new IntervalPipe();
    expect(pipe.transform('60')).toEqual('00:01:00');
  });

  it('performs correct calculation', () => {
    const pipe = new IntervalPipe();
    expect(pipe.transform('3721')).toEqual('01:02:01');
  });
  it('returns zero for negative number', () => {
    const pipe = new IntervalPipe();
    expect(pipe.transform('-36121')).toEqual('00:00:00');
  });

  it('displays both digits of hour minute and second correctly', () => {
    const pipe = new IntervalPipe();
    expect(pipe.transform('66010')).toEqual('18:20:10');
  });
});
