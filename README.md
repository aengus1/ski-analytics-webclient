# Ski Analytics 

Ski Analytics is a web application that enables athletes to interactively explore and visualize their training data.

## Getting started
---
 - Install [npm](https://www.npmjs.com/get-npm)  (don't use yarn - this is causing build errors with D3 currently)
 - Install angular-cli `npm install -g @angular/cli`





### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).



## Problems
### calling http.get resulted in this.handler.handle is not a function.  
debugged this by:

1. created test case in new project
2. found that the server was responding with an error due to cors. configured server to respond
3. googled typescript return blob

## Documentation

### 1. [Architecture](docs/redux.md)
### 2. [Filter System](docs/filter.md)
