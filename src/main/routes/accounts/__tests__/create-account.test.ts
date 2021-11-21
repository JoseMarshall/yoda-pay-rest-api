import AccountBuilder from '../../../../../test-suite/builders/account/account-builder';
import collections from '../../../../../test-suite/entities-collections';
import { apiRequest, connect, disconnect, dropDatabase } from '../../../../../test-suite/utils';
import createAccountValidator from '../../../../../test-suite/validations/schemas/http-response/account/create-account-validator';
import { MsgBodyErrorValidator } from '../../../../../test-suite/validations/schemas/http-response/errors/custom-error';
import { ApiMessages, CollectionNames } from '../../../../constants';
import { RoutesPaths } from '../../../../constants/server';

describe(`Method POST ${RoutesPaths.Accounts} should create an account`, () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await dropDatabase();
    await disconnect();
  });

  it('should return a 201 code response', async () => {
    const { id, ...newAccount } = new AccountBuilder().withAll().build();
    const response = await apiRequest.post(RoutesPaths.Accounts).send(newAccount);
    const validated = await createAccountValidator(response.body.payload);

    expect(response.status).toBe(201);
    expect(validated).toBeDefined();
    expect(response.body.msg).toContain(ApiMessages.CreatedSuccessfully);
  });

  it('should return a 422 code response due to duplicated CPF', async () => {
    const existingAccount = collections[CollectionNames.Accounts][0];
    const { id, ...newAccount } = new AccountBuilder()
      .withAll()
      .withCPF(existingAccount.cpf as string)
      .build();
    const response = await apiRequest.post(RoutesPaths.Accounts).send(newAccount);

    const validated = await MsgBodyErrorValidator(response.body);
    expect(response.status).toBe(422);
    expect(response.body.msg).toContain(ApiMessages.DuplicatedValue);
    expect(validated).toBeDefined();
  });

  it('should return a 422 code response due to invalid fields - Invalid Name', async () => {
    const newAccount = new AccountBuilder()
      .withName('A')
      .withCPF()
      .withPhone()
      .withAddress()
      .build();
    const response = await apiRequest.post(RoutesPaths.Accounts).send(newAccount);

    const validated = await MsgBodyErrorValidator(response.body);
    expect(response.status).toBe(422);
    expect(validated).toBeDefined();
  });
});
