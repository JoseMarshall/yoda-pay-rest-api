import mongoose, { Collection, Model, model, Query, Schema } from 'mongoose';

import { DatabaseHelper } from '../../repository.types';

mongoose.Promise = global.Promise;

const client = mongoose;

export const MongoHelper: DatabaseHelper<Collection, Model<any>, Schema, typeof mongoose> = {
  async connect(): Promise<void> {
    if (process.env.MONGO_URL)
      await client.connect(process.env.MONGO_URL!, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      });
  },
  async disconnect(): Promise<void> {
    await client?.disconnect();
  },
  getCollection(name: string) {
    return client?.connection.collection(name);
  },
  async clearCollection(name: string): Promise<void> {
    await client?.connection.collection(name).deleteMany({});
  },
  getModel<T>(name: string, schema: Schema<T>): Model<T> {
    return client?.models[name] ?? model<T, Model<T>>(name, schema, name);
  },
  getInstance() {
    return client;
  },
};

export async function queryGuard<T>(
  fn: Query<T, any> | Promise<T | null>,
  msg?: string
): Promise<T> {
  const data = await fn;
  if (!data) throw new Error(msg);

  return data;
}

if (client.connection.readyState === 0) {
  MongoHelper.connect()
    .then()
    .catch(() => {
      if (process.env.NODE_ENV !== 'test') {
        process.exit(1);
      }
    });
}

process.on('uncaughtException', () => {
  process.exit(1);
});
