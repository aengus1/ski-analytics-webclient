import 'jest-preset-angular';

/**
 * mapbox-gl causes a bunch of tests to barf because it requires a browser by calling window.createURL..
 */
  jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
    Map: () => ({})
  }));
