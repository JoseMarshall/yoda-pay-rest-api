import { makeSutRequest } from '../../../../../../../test-suite/utils';
import { queryGuard } from '../index';

const successFn = jest.fn().mockResolvedValue({ anyField1: 'anyValue1', anyField2: 'anyValue2' });
const failFn = jest.fn().mockResolvedValue(undefined);

const makeSut = (success = successFn, fail = failFn) => ({
  sut: queryGuard,
  success,
  fail,
});

describe(queryGuard.name, () => {
  it('should get the data returned by the function in args', async () => {
    const { sut, success } = makeSut();

    const result = await makeSutRequest(sut, success());

    expect(result).toEqual({ anyField1: 'anyValue1', anyField2: 'anyValue2' });
  });

  it('should expect an error to be thrown', () => {
    const { sut, fail } = makeSut();

    return expect(makeSutRequest(sut, fail())).rejects.toThrowError();
  });

  it('should expect an error to be thrown', () => {
    const { sut, fail } = makeSut(undefined, jest.fn().mockResolvedValue(null));

    return expect(makeSutRequest(sut, fail())).rejects.toThrowError();
  });

  it('should expect an error to be thrown', () => {
    const { sut, fail } = makeSut(undefined, jest.fn().mockResolvedValue(''));

    return expect(makeSutRequest(sut, fail())).rejects.toThrowError();
  });
});
