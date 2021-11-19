import joi from 'joi';

import { limitQueryRegex, pageQueryRegex, sortByStringfiedRegex } from '../../../../utils/regex';

// eslint-disable-next-line import/prefer-default-export
export const getAllSchema = {
  page: joi.string().required().regex(pageQueryRegex),
  limit: joi.string().regex(limitQueryRegex),
  sortBy: joi.string().pattern(sortByStringfiedRegex),
};
