
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type ActivitySearchResult = {
  id: Scalars['ID'],
  activityType?: Maybe<Scalars['String']>,
  activitySubType?: Maybe<Scalars['String']>,
  ascent?: Maybe<Scalars['Int']>,
  descent?: Maybe<Scalars['Int']>,
  maxHr?: Maybe<Scalars['Int']>,
  avHr?: Maybe<Scalars['Int']>,
  duration?: Maybe<Scalars['Int']>,
  distance?: Maybe<Scalars['Int']>,
  maxSpeed?: Maybe<Scalars['Float']>,
  avSpeed?: Maybe<Scalars['Float']>,
  device?: Maybe<Scalars['String']>,
  date?: Maybe<Scalars['String']>,
  lastUpdate?: Maybe<Scalars['String']>,
  count?: Maybe<Scalars['Int']>,
};

export type Criteria = {
  name?: Maybe<Scalars['String']>,
  value?: Maybe<Scalars['String']>,
  operator?: Maybe<Operator>,
  type?: Maybe<DataType>,
};

export enum DataType {
  String = 'STRING',
  Int = 'INT',
  Float = 'FLOAT',
  Boolean = 'BOOLEAN',
  Date = 'DATE'
}

export type Mutation = {
  addUser?: Maybe<User>,
  saveHeight?: Maybe<User>,
  saveWeight?: Maybe<User>,
  saveGender?: Maybe<User>,
  saveHrZones?: Maybe<User>,
  addTag?: Maybe<Scalars['String']>,
  deleteTag?: Maybe<Scalars['String']>,
  renameTag?: Maybe<Scalars['String']>,
  saveUnitsKms?: Maybe<User>,
  saveUnitsPace?: Maybe<User>,
  saveUnitsTime?: Maybe<User>,
  saveUnitsDate?: Maybe<User>,
};


export type MutationAddUserArgs = {
  height: Scalars['Int'],
  weight: Scalars['Int'],
  gender: Scalars['Int'],
  hrZones: Array<Maybe<Scalars['Int']>>
};


export type MutationSaveHeightArgs = {
  id: Scalars['ID'],
  height: Scalars['Int']
};


export type MutationSaveWeightArgs = {
  id: Scalars['ID'],
  weight: Scalars['Int']
};


export type MutationSaveGenderArgs = {
  id: Scalars['ID'],
  gender: Scalars['String']
};


export type MutationSaveHrZonesArgs = {
  id: Scalars['ID'],
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


export type MutationSaveUnitsKmsArgs = {
  id: Scalars['ID'],
  units_kms?: Maybe<Scalars['Int']>
};


export type MutationSaveUnitsPaceArgs = {
  id: Scalars['ID'],
  units_pace?: Maybe<Scalars['Int']>
};


export type MutationSaveUnitsTimeArgs = {
  id: Scalars['ID'],
  units_twelveHr?: Maybe<Scalars['Int']>
};


export type MutationSaveUnitsDateArgs = {
  id: Scalars['ID'],
  units_ddmm?: Maybe<Scalars['Int']>
};

export enum Operator {
  Eq = 'EQ',
  Ne = 'NE',
  Gt = 'GT',
  Gte = 'GTE',
  Lt = 'LT',
  Lte = 'LTE',
  Like = 'LIKE',
  StartsWith = 'STARTS_WITH'
}

export type OrderInfo = {
  attribute: Scalars['String'],
  asc?: Maybe<Scalars['Boolean']>,
};

export type PageInfo = {
  pageSize?: Maybe<Scalars['Int']>,
  pageNumber?: Maybe<Scalars['Int']>,
};

export type Parameter = {
  name?: Maybe<Scalars['String']>,
  value?: Maybe<Scalars['String']>,
  type?: Maybe<ParamType>,
};

export enum ParamType {
  String = 'STRING',
  Boolean = 'BOOLEAN',
  Number = 'NUMBER'
}

export type Query = {
  getUser?: Maybe<User>,
  getActivities: Array<Maybe<Scalars['String']>>,
  searchActivities?: Maybe<Array<Maybe<ActivitySearchResult>>>,
};


export type QueryGetActivitiesArgs = {
  sql: Scalars['String'],
  parameters: Array<Maybe<Parameter>>
};


export type QuerySearchActivitiesArgs = {
  predicates: Array<Maybe<Criteria>>,
  pagination?: Maybe<PageInfo>,
  order?: Maybe<OrderInfo>
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
  units_kms?: Maybe<Scalars['Int']>,
  units_twelveHr?: Maybe<Scalars['Int']>,
  units_pace?: Maybe<Scalars['Int']>,
  units_ddmm?: Maybe<Scalars['Int']>,
};

