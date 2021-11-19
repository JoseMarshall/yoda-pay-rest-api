import { ClientSession, Document, Model } from 'mongoose';

export interface MakeGetAllEntitiesDependencies<D, K> {
  projection?: Record<string, 0 | 1 | boolean>;
  formatData?: (data: ReadonlyArray<D>) => ReadonlyArray<K>;
  formatQuery?: (query: Record<string, string | unknown>) => Record<string, unknown>;
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
  options: MakeGetAllEntitiesDependencies<D, K>;
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
