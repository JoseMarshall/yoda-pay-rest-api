import { GetAll } from '../sub-types';

export interface GetAllAccounts extends GetAll {
  name?: string;
}

export interface UpdateOneAccount {
  query: {
    id?: string;
    cpf?: string;
  };
  body: {
    phone?: string;
    address?: string;
  };
}

export interface EnableAccount {
  id?: string;
  cpf?: string;
}

export interface DisableAccount {
  id?: string;
  cpf?: string;
}
