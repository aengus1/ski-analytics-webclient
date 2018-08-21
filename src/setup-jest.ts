import 'jest-preset-angular';
import {Mock} from 'protractor/built/driverProviders';


/**
 * mapbox-gl causes a bunch of tests to barf because it requires a browser by calling window.createURL..
 */
  jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
    Map: () => ({})
  }));

export const createSpyObj = (baseName, methodNames): { [key: string]: Mock<any> } => {
  const obj: any = {};

  for (let i = 0; i < methodNames.length; i++) {
    obj[methodNames[i]] = jest.fn();
  }

  return obj;
};
