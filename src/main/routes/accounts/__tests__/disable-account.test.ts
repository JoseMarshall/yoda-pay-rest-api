import faker from 'faker';

import collections from '../../../../../test-suite/entities-collections';
import {
  apiRequest,
  collectionInit,
  connect,
  disconnect,
  dropDatabase,
} from '../../../../../test-suite/utils';
import { MsgBodyErrorValidator } from '../../../../../test-suite/validations/schemas/http-response/errors/custom-error';
import { ApiMessages, CollectionNames } from '../../../../constants';
import { RoutesPaths } from '../../../../constants/server';
import { AccountModel } from '../../../external/repositories/mongodb/models';

describe(`Method PATCH ${RoutesPaths.Accounts}/disable should disable an account`, () => {
  beforeAll(async () => {
    await connect();
    await collectionInit(AccountModel, CollectionNames.Accounts);
  });

  afterAll(async () => {
    await dropDatabase();
    await disconnect();
  });

  it('should return a 200 code response and a message - Search by CPF', async () => {
    const account = collections.accounts[0];
    const response = await apiRequest
      .patch(`${RoutesPaths.Accounts}/disable`)
      .query({ cpf: account.cpf })
      .send();
    expect(response.status).toBe(200);
    expect(response.body.msg).toContain(ApiMessages.DisabledSuccessfully);
  });

  it('should return a 200 code response and a message - Search by ID', async () => {
    const account = collections.accounts[1];
    const response = await apiRequest
      .patch(`${RoutesPaths.Accounts}/disable`)
      .query({ id: account.id })
      .send();
    expect(response.status).toBe(200);
    expect(response.body.msg).toContain(ApiMessages.DisabledSuccessfully);
  });

  it('should return a 404 code response due to not found account', async () => {
    const response = await apiRequest
      .patch(`${RoutesPaths.Accounts}/disable`)
      .query({ id: faker.datatype.uuid() })
      .send();
    const validated = await MsgBodyErrorValidator(response.body);

    expect(response.status).toBe(404);
    expect(validated).toBeDefined();
  });
});
