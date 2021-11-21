import { makeGetAllResponseBodySchema } from '../../../builders';
import { accountSchema } from '../../entities';

// eslint-disable-next-line import/prefer-default-export
export const listAccountsResponseBodySchema = makeGetAllResponseBodySchema(
  accountSchema.properties,
  'The signature of each account',
  accountSchema.required
);
