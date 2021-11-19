import AccountBuilder from '../../../../../../../test-suite/builders/account/account-builder';
import {
  connect,
  disconnect,
  dropDatabase,
  makeSutRequest,
} from '../../../../../../../test-suite/utils';
import createAccountValidator from '../../../../../../../test-suite/validations/schemas/http-response/account/create-account-validator';
import { AccountModel } from '../../models';
import { makeCreateEntity } from '../index';

const makeSut = (model = AccountModel) => ({
  sut: makeCreateEntity,
  model,
});

describe(makeCreateEntity.name, () => {
  const { sut, model } = makeSut();

  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await disconnect();
    await dropDatabase();
  });

  it('should create an entity in mongodb repository', async () => {
    const newAccount = new AccountBuilder().withAll().build();
    const result = await makeSutRequest(sut({ model }), newAccount);
    const validated = await createAccountValidator(result);

    expect(validated).toBeDefined();
  });

  it('should get an error due to missing required fields', async () => {
    const newAccount = new AccountBuilder().withName().build();
    try {
      await makeSutRequest(sut({ model }), newAccount);
      fail('Should not reach here');
    } catch (error) {
      expect(true);
    }
  });

  it('should get a duplicate key error "cpf"', async () => {
    const myAccount = new AccountBuilder().withAll().build();

    try {
      const firstResult = await makeSutRequest(sut({ model }), myAccount);
      const accountValidatorResult = await createAccountValidator(firstResult);
      expect(accountValidatorResult).toBeDefined();

      await makeSutRequest(sut({ model }), myAccount);
      fail('Should not reach here');
    } catch (error) {
      expect(true);
    }
  });
});
