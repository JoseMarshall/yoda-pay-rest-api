import { v4 as uuid } from 'uuid';

import { IAccount, IAccountInput } from './account.types';

// eslint-disable-next-line import/prefer-default-export
export const makeAccount = (data: IAccountInput, id?: string): IAccount => ({
  id: id ?? uuid(),
  ...data,
  disabled: false,
  createdAt: new Date(),
  updatedAt: new Date(),
});
