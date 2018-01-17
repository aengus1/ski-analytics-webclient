import {TitleCasePipe} from './titlecase.pipe';


describe('TitleCasePipe', () => {

  it('converts a lower case string to title case', () => {
    const pipe = new TitleCasePipe();
    expect(pipe.transform('this is a test')).toEqual('This Is A Test');
  });

  it('converts an upper case string to title case', () => {
  const pipe = new TitleCasePipe();
  expect(pipe.transform('THIS IS A TEST')).toEqual('This Is A Test');
  });

  it('handles an empty string', () => {
  const pipe = new TitleCasePipe();
  expect(pipe.transform('')).toEqual('');
  });

  it('converts a mixed case string', () => {
    const pipe = new TitleCasePipe();
    expect(pipe.transform('tHiS Is A tESt')).toEqual('This Is A Test');
  });

});
