# GraphQL
##1. Overview
GraphQL encourages a very different approach to state management than the 
Redux / NGRX approach.  It is considerably simpler - suggesting that queries and components
are co-located so that the code is easier to follow.  No need for services, actions, reducers,
stores etc etc.  

We are using a mixture of GraphQL and NGRX styles in this application.  I know that this is
annoying and adds a bunch of complexity.  The reasons for this are largely historical but 
can be summarized as:
- graphql doesn't support binary payloads.  Therefore the activity module with it's protobuf
implementation is not a good candidate for using graphql.
- what graphql is great at is providing a simple and flexible interface for searching and for
updating data.  

###In this application we are using graphql for:
- retrieving / updating user settings
- retrieving / updating activity editable fields (planned)
- activity search (in progress)


### What are the problems with GraphQL and particularly with mixing GraphQL with NGRX?

- How do you share data between components?  In NgRx this is straightforward.  Everything
is persisted to the store and can be accessed from there.  
     - We could do this with data retrieved through GraphQL too.. and just use GraphQL for
     querying.
- Developer needs to spend time figuring out what pattern is used before diving in


### Code Gen
To generate model classes from the graphql schema:  `npm run generate`  This outputs to the 
/generated/graphql.ts class
