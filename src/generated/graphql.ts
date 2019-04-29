
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Mutation = {
  addUser?: Maybe<User>,
  saveHeight?: Maybe<User>,
  saveWeight?: Maybe<User>,
  saveGender?: Maybe<User>,
  saveHrZones?: Maybe<User>,
};


export type MutationAddUserArgs = {
  userId: Scalars['ID'],
  height?: Maybe<Scalars['Int']>,
  weight?: Maybe<Scalars['Int']>,
  gender?: Maybe<Scalars['Int']>,
  hrZones?: Maybe<Array<Maybe<Scalars['Int']>>>
};


export type MutationSaveHeightArgs = {
  userId: Scalars['ID'],
  height: Scalars['Int']
};


export type MutationSaveWeightArgs = {
  userId: Scalars['ID'],
  weight: Scalars['Int']
};


export type MutationSaveGenderArgs = {
  userId: Scalars['ID'],
  gender: Scalars['String']
};


export type MutationSaveHrZonesArgs = {
  userId: Scalars['ID'],
  hrZones: Array<Maybe<Scalars['Int']>>
};

export type Query = {
  getUser: User,
};


export type QueryGetUserArgs = {
  id?: Maybe<Scalars['Int']>
};

export type Schema = {
  query?: Maybe<Query>,
  mutation?: Maybe<Mutation>,
};

export type User = {
  userId: Scalars['ID'],
  gender?: Maybe<Scalars['String']>,
  height?: Maybe<Scalars['Int']>,
  weight?: Maybe<Scalars['Int']>,
  hrZones?: Maybe<Array<Maybe<Scalars['Int']>>>,
};
