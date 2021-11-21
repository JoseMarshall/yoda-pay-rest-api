import { makeGeneralResponseBodySchema } from '../../../builders';
import { accountSchema } from '../../entities';

// eslint-disable-next-line import/prefer-default-export
export const createAccountResponseBodySchema = makeGeneralResponseBodySchema(
  accountSchema.properties,
  accountSchema.required
);
