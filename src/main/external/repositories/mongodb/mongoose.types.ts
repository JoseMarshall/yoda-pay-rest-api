import { ClientSession, Document, Model } from 'mongoose';

import { Query } from '../repository.types';

export interface MakeGetAllEntitiesDependencies<K> {
  projection?: Record<string, 0 | 1 | boolean>;
  formatData?: (data: ReadonlyArray<Document>) => ReadonlyArray<K>;
  formatQuery?: (query: Query) => Record<string, unknown>;
}

export interface MakeGetOneEntityDependencies<D, K> {
  projection?: Record<string, 0 | 1 | boolean>;
  formatData?: (data: D) => K;
}

interface TotalCount {
  total: number;
}

export interface GetAllEntitiesAggregatedData<T> {
  data: ReadonlyArray<T>;
  count: TotalCount[];
}

export interface MakeGetOneEntityData<D extends Document, K> {
  model: Model<D>;
  options: MakeGetOneEntityDependencies<D, K>;
  transaction?: ClientSession;
}

export interface MakeGetAllEntityData<D extends Document, K> {
  model: Model<D>;
  options: MakeGetAllEntitiesDependencies<K>;
}

export interface MakeUpdateOneEntityData<D extends Document> {
  model: Model<D>;
  transaction?: ClientSession;
}

export interface MakeCreateEntityData<D extends Document> {
  model: Model<D>;
  transaction?: ClientSession;
}

export interface MakeDeleteOneEntityData<D extends Document> {
  model: Model<D>;
  transaction?: ClientSession;
}
