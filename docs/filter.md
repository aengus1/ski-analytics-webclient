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

In the application there are cases when it is necessary to perform aggregations on the filtered activity.  E.g. summing distance, time, time in heart rate zone, etc. In order to perform these calculations accurately we need to know where the breaks are in the activity value series.  For example, total moving time is calculated by summing the time difference between points where the point has a non-zero speed.  If points 3 to 10 are filtered out, our filtered data array
will look like 1,2,11 and would include the timestamp difference between 2 and 11 which is not accurate because these points should not be included.  Instead we insert markers: `NaN` for numerical value series and `marker` for string series.  To simplify the aggregation algorithms, contigious markers are removed, i.e. our series would become 1,2, NaN, 11.
 
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
 
 As all data series maintain the same shape, markers are inserted equally into every series.
 
 ###Timestamp Lookup
 
 In most cases when performing summary calculations around filtered out points that do pairwise comparisons between adjacent points, we make the assumption that if point A is unfiltered then we include the time/dist/whatever sum between A and B in the aggregation.  
 
 e.g. given `5`, `NaN`, `6`  we would include the `5` to `NaN` but not the `NaN` to `6`.  This presents a problem as the value (and timestamp) for `NaN` is obviously missing.  We could get around this by looking up the point at the same index as `NaN` in the unfiltered activity, but because contigious markers are reduced down to a single marker the indices are also skewed.
 The solution used here is to create a lookup map between index and timestamp on the unfiltered activity as timestamps are guaranteed to be unique across points.  In this example then we could lookup the timestamp for value at `5`, get the index and add `1` to get the index of `NaN`, allowing us to look it up in the unfiltered activity.
  
 
 
