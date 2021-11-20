import { GetAll } from '../sub-types';

export interface GetAllAccounts extends GetAll {
  name?: string;
}

export type AccountIdentifier = Record<'id' | 'cpf', string>;

export interface UpdateOneAccount {
  query: AccountIdentifier;
  body: {
    phone?: string;
    address?: string;
  };
}
