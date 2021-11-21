import { makeRequestBodySchema } from '../../../builders';
import { accountSchema } from '../../entities';

// eslint-disable-next-line import/prefer-default-export
export const createAccountRequestBodySchema = makeRequestBodySchema(
  {
    name: accountSchema.properties.name,
    cpf: accountSchema.properties.cpf,
    phone: accountSchema.properties.phone,
    address: accountSchema.properties.address,
  },
  ['name', 'cpf', 'phone', 'address']
);
