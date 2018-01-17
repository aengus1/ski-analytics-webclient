import { RemoveUnderscorePipe } from './remove-underscore.pipe';

describe('RemoveUnderscorePipe', () => {
  it('removes underscore', () => {
    const pipe = new RemoveUnderscorePipe();
    expect(pipe.transform('This_is_a_test')).toEqual('This is a test');
  });

  it('handles no underscores correctly', () => {
    const pipe = new RemoveUnderscorePipe();
    expect(pipe.transform('This is a test')).toEqual('This is a test');
  });
});
