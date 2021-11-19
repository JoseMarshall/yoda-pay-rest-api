import { Document } from 'mongoose';

import { Entity } from '../../../../../entities/entity.types';
import { queryGuard } from '../helpers';
import { MakeCreateEntityData } from '../mongoose.types';

// eslint-disable-next-line import/prefer-default-export
export function makeCreateEntity<D extends Document, K extends Entity>({
  model,
  transaction,
}: MakeCreateEntityData<D>) {
  return async (body: K): Promise<K> => {
    const doc = (
      await queryGuard<D[]>(
        model.create([{ ...body, _id: body.id }], {
          session: transaction?.id ? transaction : undefined,
        })
      )
    )[0];
    return doc.toObject() as unknown as K;
  };
}
