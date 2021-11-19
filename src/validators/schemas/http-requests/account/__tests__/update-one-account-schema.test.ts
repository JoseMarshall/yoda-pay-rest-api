import AccountBuilder from '../../../../../../test-suite/builders/account/account-builder';
import updateAccountSchema from '../update-one-account-schema';

const makeSut = () => ({ sut: updateAccountSchema });

describe(updateAccountSchema.name, () => {
  it('returns the req, means its success - Query Id', async () => {
    const { sut } = makeSut();
    const { id, ...body } = new AccountBuilder().withId().withPhone().withAddress().build();
    const req = {
      body,
      query: { id },
    };
    const result = await sut(req);
    expect(result).toEqual(req);
  });

  it('returns the req, means its success - Query CPF', async () => {
    const { sut } = makeSut();
    const { cpf, ...body } = new AccountBuilder().withCPF().withPhone().withAddress().build();
    const req = {
      body,
      query: { cpf },
    };
    const result = await sut(req);
    expect(result).toEqual(req);
  });

  it('throws an error if no req is passed', async () => {
    const { sut } = makeSut();
    return expect(sut({})).rejects.toBeDefined();
  });

  it('throws an error if at least one field is not valid', async () => {
    const { sut } = makeSut();
    const req = {
      body: {
        phone: '930869023',
      },
      query: { id: 'invalid-id' },
    };
    return expect(sut(req)).rejects.toBeDefined();
  });

  it('throws an error if unknown keys passed', async () => {
    const { sut } = makeSut();
    const { id, ...body } = new AccountBuilder().withId().withPhone().build();
    const req = {
      body: {
        ...body,
        unknownKey: 'any_value',
      },
      query: { id },
    };
    return expect(sut(req)).rejects.toBeDefined();
  });
});
