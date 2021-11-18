/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
import faker from 'faker';
import { v4 as uuid } from 'uuid';

import { IAccount } from './account-builder.types';

class AccountBuilder {
  private _entity: IAccount;

  constructor(entity?: IAccount) {
    this._entity = entity ?? {};
  }

  build() {
    return this._entity;
  }

  withId(id?: string) {
    this._entity.id = id ?? uuid();
    return this;
  }

  withName(name?: string) {
    this._entity.name = name ?? faker.name.findName();
    return this;
  }

  withCPF(cpf?: string) {
    this._entity.cpf = cpf ?? faker.finance.account(7);
    return this;
  }

  withPhone(phone?: string) {
    this._entity.phone = phone ?? faker.phone.phoneNumber();
    return this;
  }

  withAddress(address?: string) {
    this._entity.address = address ?? faker.address.streetName();
    return this;
  }

  /**
   * This approach allows easy modification of test values
   * @returns the account with all fields including the id
   */
  withAll() {
    return this.withId().withName().withCPF().withPhone().withAddress();
  }
}

export default AccountBuilder;
