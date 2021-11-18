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
  return async (query: Query) => {
    const { id, ...q } = query;
    const doc = await queryGuard<D>(
      model
        .findOne(
          { id, disabled: false, ...q } as FilterQuery<unknown>,
          {
            _id: 0,
            ...(options.projection ?? {}),
          },
          {
            session: transaction?.id ? transaction : undefined,
          }
        )
        .lean()
    );

    return options.formatData ? options.formatData(doc) : (doc as unknown as K);
  };
}
