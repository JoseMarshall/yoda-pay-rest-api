import { Document, FilterQuery } from 'mongoose';

import { DeletedEntity, Query } from '../../repository.types';
import { queryGuard } from '../helpers';
import { MakeDeleteOneEntityData } from '../mongoose.types';

// eslint-disable-next-line import/prefer-default-export
export function makeDeleteOneEntity<D extends Document>({
  model,
  transaction,
}: MakeDeleteOneEntityData<D>) {
  return async (query: Query) => {
    const doc = await queryGuard<D>(
      model
        .findOneAndUpdate(
          { id: query.id, disabled: false } as FilterQuery<unknown>,
          { disabled: true, disabledAt: new Date() } as FilterQuery<unknown>,
          {
            projection: {
              _id: 0,
              id: 1,
              disabled: 1,
              disabledAt: 1,
              createdAt: 1,
              updatedAt: 1,
            },
            new: true,
            session: transaction?.id ? transaction : undefined,
          }
        )
        .lean()
    );
    return doc as unknown as DeletedEntity;
  };
}
