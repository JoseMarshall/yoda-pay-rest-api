import joi from 'joi';

import { limitQueryRegex, pageQueryRegex, sortQueryRegex } from '../../../../utils/regex';

// eslint-disable-next-line import/prefer-default-export
export const getAllSchema = {
  page: joi.string().required().regex(pageQueryRegex),
  limit: joi.string().regex(limitQueryRegex),
  sort: joi.string().pattern(sortQueryRegex),
  'include-disabled': joi.boolean().valid('true', 'false').options({ convert: false }),
};
