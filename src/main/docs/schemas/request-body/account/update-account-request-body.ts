import { makeRequestBodySchema } from '../../../builders';
import { accountSchema } from '../../entities';

// eslint-disable-next-line import/prefer-default-export
export const updateAccountRequestBodySchema = makeRequestBodySchema(
  {
    phone: accountSchema.properties.phone,
    address: accountSchema.properties.address,
  },
  []
);
