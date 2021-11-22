import { safeParseBoolean } from '../data-parsers';

const testCases: (string | number | any)[][] = [
  ['true', true],
  ['TRUE', true],
  ['true.false', false],
  ['true||false', false],
  ['true&&false', false],
  ['false', false],
  ['false.true', false],
  ['false||true', false],
  ['{}', false],
  ['{"any": 1}', false],
  ['1', false],
  ['0', false],
  ['[]', false],
  [' ', false],
  ['-Inf', false],
  ['+Inf', false],
  [NaN, false],
  [undefined, false],
  [null, false],
];

const makeSut = () => ({
  sut: safeParseBoolean,
});

describe(safeParseBoolean.name, () => {
  test.each(testCases)(
    `given %s as string to be parsed, 
    the result should be %o`,
    async (str: string, expectedResult: number) => {
      const { sut } = makeSut();
      expect(sut(str)).toBe(expectedResult);
    }
  );
});
