module.exports = {
  globals: {
    'ts-jest': {
      'allowSyntheticDefaultImports': true
    },
    "__TRANSFORM_HTML__": true
  },

  preset: "jest-preset-angular",
  roots: [
    "<rootDir>/src/"
  ],
  setupFilesAfterEnv: ["<rootDir>/src/setup-jest.ts"],
  transformIgnorePatterns: [
    "node_modules/(?!@ngrx|angular2-ui-switch|ng-dynamic|d3-ng2-service)"
  ],
  transform: {
    "^.+\\.(ts|html)$": "<rootDir>/node_modules/jest-preset-angular/preprocessor.js",
    "^.+\\.js$": "babel-jest"
  }

  };


