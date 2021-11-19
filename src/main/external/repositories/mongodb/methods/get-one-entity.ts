import { Document, FilterQuery } from 'mongoose';

import { Query } from '../../repository.types';
import { queryGuard } from '../helpers';
import { MakeGetOneEntityData } from '../mongoose.types';

// eslint-disable-next-line import/prefer-default-export
export function makeGetOneEntity<D extends Document, K>({
  model,
  options,
  transaction,
}: MakeGetOneEntityData<D, K>) {
  return async (query: Query): Promise<K> => {
    const doc = await queryGuard<D>(
      model
        .findOne({ disabled: false, ...query } as FilterQuery<unknown>, options.projection)
        .session(transaction?.id ? transaction : null)
        .lean()
    );

    return options.formatData ? options.formatData(doc) : (doc as unknown as K);
  };
}
