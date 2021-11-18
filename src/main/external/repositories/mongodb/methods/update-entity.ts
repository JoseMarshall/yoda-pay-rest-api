import { Document, FilterQuery } from 'mongoose';

import { Entity } from '../../../../../entities/entity.types';
import { Query } from '../../repository.types';
import { queryGuard } from '../helpers';
import { MakeUpdateOneEntityData } from '../mongoose.types';

// eslint-disable-next-line import/prefer-default-export
export function makeUpdateOneEntity<D extends Document, T>({
  model,
  transaction,
}: MakeUpdateOneEntityData<D>) {
  return async (query: Query, body: Omit<Record<string, any>, keyof Entity>) => {
    const doc = await queryGuard<D>(
      model
        .findOneAndUpdate(
          { id: query.id, disabled: false } as FilterQuery<unknown>,
          body as FilterQuery<unknown>,
          {
            new: true,
            session: transaction?.id ? transaction : undefined,
          }
        )
        .lean()
    );
    return doc as unknown as T;
  };
}
