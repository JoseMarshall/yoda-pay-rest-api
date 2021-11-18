import { Entity } from '../entity.types';

export interface IAccount extends Entity {
  name: string;
  cpf: string;
  phone: string;
  address: string;
}

export type IAccountInput = Omit<IAccount, keyof Entity>;
