# Architecture
##1. Overview
This application closely follows the design pattern set out in the [@ngrx/platform](https://github.com/ngrx/platform) example app.



##2. Modules

###[Root Module] (#root-module)
###[Activity Module] (#activity-module)
###[Chart Module] (#chart-module)
###[Shared Module] (#shared-module)


## Root Module
The application root.  
  
## Activity Module

The Activity Module is a lazy loaded module that is activated by navigating to `/activity/:id`.  This route loads the ViewActivityPageComponent into the ActivityRoot.  SelectedActivityPageComponent is the main container for the activity module where the store actions are dispatched.  All child components bubble events up to this container.  

## Chart Module

The chart module contains re-usable D3 components for drawing graphs, charts and filter controls.  This is a candidate for moving to a separate repository and possibly open sourcing.  It has no dependencies on the rest of the application.

## Shared Module

The shared module contains utilities, pipes, layout state and components that are reusable across the application.