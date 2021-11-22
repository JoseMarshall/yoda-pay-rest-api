import { Document } from 'mongoose';

import { ApiErrorsName, ApiErrorsType, ApiMessages } from '../../../../../constants';
import { Entity } from '../../../../../entities/entity.types';
import CustomError from '../../../../../utils/custom-error';
import { queryGuard } from '../helpers';
import { MakeCreateEntityData } from '../mongoose.types';

// eslint-disable-next-line import/prefer-default-export
export function makeCreateEntity<D extends Document, K extends Entity>({
  model,
  transaction,
}: MakeCreateEntityData<D>) {
  return async (body: K): Promise<K> => {
    try {
      const doc = (
        await queryGuard<D[]>(
          model.create([{ ...body, _id: body.id }], {
            session: transaction?.id ? transaction : undefined,
          })
        )
      )[0];
      return doc.toObject() as unknown as K;
    } catch (error) {
      // Verify if its a mongoDB duplicate key error
      throw error.code === 11000
        ? new CustomError({
            statusCode: 422,
            name: ApiErrorsName.DuplicatedValue,
            type: ApiErrorsType.ValidationError,
            message: ApiMessages.DuplicatedValue,
            stack: error.stack,
            details: { existingValues: error.keyValue, msg: error.message },
          })
        : error;
    }
  };
}
