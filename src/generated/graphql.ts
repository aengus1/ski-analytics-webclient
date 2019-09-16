
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
  addTag?: Maybe<Scalars['String']>,
  deleteTag?: Maybe<Scalars['String']>,
  renameTag?: Maybe<Scalars['String']>,
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


export type MutationAddTagArgs = {
  id: Scalars['ID'],
  tag: Scalars['String']
};


export type MutationDeleteTagArgs = {
  id: Scalars['ID'],
  tag: Scalars['String']
};


export type MutationRenameTagArgs = {
  id: Scalars['ID'],
  tag: Scalars['String'],
  newName: Scalars['String']
};

export type Query = {
  getUser?: Maybe<User>,
};

export type Schema = {
  query?: Maybe<Query>,
  mutation?: Maybe<Mutation>,
};

export type User = {
  id: Scalars['ID'],
  gender?: Maybe<Scalars['String']>,
  height?: Maybe<Scalars['Int']>,
  weight?: Maybe<Scalars['Int']>,
  hrZones?: Maybe<Array<Maybe<Scalars['Int']>>>,
  tags?: Maybe<Array<Maybe<Scalars['String']>>>,
  devices?: Maybe<Array<Maybe<Scalars['String']>>>,
  activityTypes?: Maybe<Array<Maybe<Scalars['String']>>>,
};
