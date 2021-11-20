import { IAccount } from '../../../entities/account/account.types';
import { Entity } from '../../../entities/entity.types';

export interface GetAllEntitiesData<T> {
  data: ReadonlyArray<T>;
  count: number;
}

export type QueryGetAll = {
  page: string;
  limit?: string;
  sortBy?: string;
  // [x: string]: string;
};

export interface Query {
  id?: string;
  [x: string]: unknown;
}

export interface DeletedEntity {
  id: string;
  disabled: boolean;
  disabledAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface IRepository<T> {
  add(entity: T): Promise<T>;
  get<O>(query: Query, options: O): Promise<T>;
  getAll<O>(query: QueryGetAll, options: O): Promise<GetAllEntitiesData<T>>;
  update(query: Query, body: Omit<Record<string, any>, keyof Entity>): Promise<T>;
  remove(query: Query): Promise<DeletedEntity>;
}

export interface IUnitOfWork {
  transaction: unknown;
  makeAccountRepository: () => IRepository<IAccount>;
  commitChanges(): Promise<void>;
  rollback(): Promise<void>;
  startTransaction(): Promise<void>;
}

export interface DatabaseHelper<
  Collection = unknown,
  Model = unknown,
  Schema = unknown,
  Instance = unknown
> {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  getCollection(name: string): Collection | undefined;
  getModel(name: string, schema: Schema): Model;
  getInstance(): Instance;
  clearCollection?: (name: string) => Promise<void>;
}
