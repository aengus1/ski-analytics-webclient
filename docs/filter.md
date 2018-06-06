#Activity Filter System
##1. Overview
This guide provides a description of how activity filtering is accomplished in the application. 

The activity module's primary function is to enable users to interactively explore and visualize activity data.  This filter system allows for multiple customized filters to be applied to the data. It provides a framework to build custom filters through a series of classes and interfaces.  It also provides a means to develop custom filter controls through angular components.

## 2. Redux Store

All activities are stored in the `activities` slice of the Redux store using the [ngrx](https://github.com/ngrx/platform) entity adapter.  *selectedActivity* represents the currently displayed activity and is the only activity that we are concerned with from a filtering perspective.  A reference to *selectedActivity* is stored alongside the *entities* array. Filtering is done in place on the selected activity object in the entity adapter's entities array.  

At the time an activity is selected, using the `ActivityActionTypes.Select` action, a deep copy of the original activity is placed in the *unfilteredActivity* object.  This is used to recreate the *selectedActivity* when removing or updating a filter.

Activity Filters are stored in a separate slice of the redux store named `filters`.  Activity Filters are represented by the typescript interface `activity/model/activity-filter/ActivityFilter`, but they also have a JSON representation.  

>Redux can only store serializable objects (i.e. JSON, not serialized classes), so when attempting to store instances of `ActivityFilter` the entityadapter methods get stripped, and the plain JSON objects have to be rehydrated back into typescript classes in order to use them.  

##3. Component Tree

### Redux Store  | `activities`  `filters` 
Responsible for storing activity data and the filters that are applied to the activity.  All updates to data are handled through actions.
  
 
### Filter List Container | `containers/filter-list`
 Responsible for holding the collection of filter components and dispatching actions to the store.  Also maintains a counter to display a badge showing the number of active filters being applied to the data.
 
### FilterComponent |`components/filter-component`
A 'dumb' angular component that acts as a display for a filter control.  Has a toggle switch to turn filter on / off and a clear button to reset the filter.

 
### ? extends FilterBase |  `components/filter-?`
An individualized filter control that is wrapped by the `FilterComponent` and emits filter events up the chain to the store.  This is typically a thin wrapper around a D3 component.  When the filter is enabled, this component creates an instance of the `ActivityFilter` object and dispatches it to the store.  A reference to the filter's id is kept so that it can subsequently send updates and remove requests.


### Markers

 
 ```puml
 @startuml
 robust "State" as WB

 @0 
 WB is Stop
 
 @1
 WB is Stop
 
 @2
 WB is Moving
  
 @9 
 WB is Moving
 
 @10 
 WB is Stop
 
 @11
 WB is Moving
 
 @13 
 WB is Moving
 
  
 
 @enduml
 ```
 
 
 
