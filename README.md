# Ski Analytics 

Ski Analytics is a web application that enables athletes to interactively explore and visualize their training data.

## Getting started
---
 - Install [npm](https://www.npmjs.com/get-npm)  (don't use yarn - this is causing build errors with D3 currently)
 - Install angular-cli `npm install -g @angular/cli`
 
 
## Compiling protobuf

First npm install ts-protoc-gen
then `npm install && npm run build`

From src/app/proto/Activity folder (containing the .proto file)

protoc --plugin=protoc-gen-ts=../../../../node_modules/.bin/protoc-gen-ts --js_out=import_style=commonjs,binary:. --ts_out=service=true:. Activity.proto





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

### ng g c putting files in wrong place after angular 6 upgrade
this is a known bug with angular-cli https://github.com/angular/angular-cli/issues/10653
resolved by adding the project name to this command like so:
`ng g c --project='ski-analytics-web' activity/components/filter-hrzone --skip-import`

## Documentation

### 1. [Architecture](docs/redux.md)
### 2. [Filter System](docs/filter.md)
