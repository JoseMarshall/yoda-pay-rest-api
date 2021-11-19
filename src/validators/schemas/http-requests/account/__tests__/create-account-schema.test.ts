import AccountBuilder from '../../../../../../test-suite/builders/account/account-builder';
import createAccountSchema from '../create-account-schema';

const makeSut = () => ({ sut: createAccountSchema });

describe(createAccountSchema.name, () => {
  it('returns the body, means its success', async () => {
    const { sut } = makeSut();
    const { id, ...body } = new AccountBuilder().withAll().build();
    const result = await sut(body);
    expect(result).toEqual(body);
  });

  it('throws an error if no body is passed', async () => {
    const { sut } = makeSut();
    try {
      await sut({});
    } catch (error) {
      expect(error.statusCode).toBe(422);
    }
  });

  it('throws an error if at least one field is not valid', async () => {
    const { sut } = makeSut();
    const { id, ...body } = new AccountBuilder()
      .withAll()
      .withCPF('CPF Is Toooooooooooooooooo Long')
      .build();

    try {
      await sut(body);
    } catch (error) {
      expect(error.statusCode).toBe(422);
    }
  });

  it('throws an error if unknown keys passed', async () => {
    const { sut } = makeSut();
    const { id, ...body } = new AccountBuilder().withAll().build();
    try {
      await sut({ ...body, unknownKey: 'any_value' });
    } catch (error) {
      expect(error.statusCode).toBe(422);
    }
  });
});
