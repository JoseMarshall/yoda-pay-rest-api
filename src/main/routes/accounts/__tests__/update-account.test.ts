import faker from 'faker';

import AccountBuilder from '../../../../../test-suite/builders/account/account-builder';
import collections from '../../../../../test-suite/entities-collections';
import { mockCommitChanges, mockRollback } from '../../../../../test-suite/global-mocks';
import {
  apiRequest,
  collectionInit,
  connect,
  disconnect,
  dropDatabase,
} from '../../../../../test-suite/utils';
import updateAccountValidator from '../../../../../test-suite/validations/schemas/http-response/account/update-account-validator';
import { MsgBodyErrorValidator } from '../../../../../test-suite/validations/schemas/http-response/errors/custom-error';
import { ApiMessages, CollectionNames } from '../../../../constants';
import { RoutesPaths } from '../../../../constants/server';
import { AccountModel } from '../../../external/repositories/mongodb/models';

describe(`Method PATCH ${RoutesPaths.Accounts} should update an account`, () => {
  beforeAll(async () => {
    await connect();
    await collectionInit(AccountModel, CollectionNames.Accounts);
  });

  afterAll(async () => {
    await dropDatabase();
    await disconnect();
  });

  it('should return a 200 code response - Update by ID', async () => {
    const { id } = collections.accounts[0];
    const updatingField = new AccountBuilder().withAddress().withPhone().build();
    const response = await apiRequest.patch(RoutesPaths.Accounts).query({ id }).send(updatingField);
    const validated = await updateAccountValidator(response.body.payload);

    expect(response.status).toBe(200);
    expect(validated).toBeDefined();
    expect(response.body.msg).toContain(ApiMessages.UpdatedSuccessfully);
    expect(mockCommitChanges).toHaveBeenCalledTimes(1);
  });

  it('should return a 200 code response - Update by CPF', async () => {
    const { cpf } = collections.accounts[0];
    const updatingField = new AccountBuilder().withAddress().withPhone().build();
    const response = await apiRequest
      .patch(RoutesPaths.Accounts)
      .query({ cpf })
      .send(updatingField);
    const validated = await updateAccountValidator(response.body.payload);

    expect(response.status).toBe(200);
    expect(validated).toBeDefined();
    expect(response.body.msg).toContain(ApiMessages.UpdatedSuccessfully);
    expect(mockCommitChanges).toHaveBeenCalledTimes(1);
  });

  it('should return a 422 code response due to account not found', async () => {
    const updatingField = new AccountBuilder().withAddress().withPhone().build();
    const response = await apiRequest
      .patch(RoutesPaths.Accounts)
      .query({ id: faker.datatype.uuid() })
      .send(updatingField);

    const validated = await MsgBodyErrorValidator(response.body);
    expect(response.status).toBe(422);
    expect(response.body.msg).toContain(ApiMessages.FailureUpdating);
    expect(validated).toBeDefined();
    expect(mockRollback).toHaveBeenCalledTimes(1);
  });

  it('should return a 422 code response due to attempting updating not allowed field - CPF', async () => {
    const { id } = collections.accounts[0];
    const updatingField = new AccountBuilder().withCPF().withPhone().build();
    const response = await apiRequest.patch(RoutesPaths.Accounts).query({ id }).send(updatingField);

    const validated = await MsgBodyErrorValidator(response.body);
    expect(response.status).toBe(422);
    expect(validated).toBeDefined();
  });
});
