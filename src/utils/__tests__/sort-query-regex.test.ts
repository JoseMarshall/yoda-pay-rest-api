import { sortQueryRegex } from '../regex';

const testCases: (string | boolean | any)[][] = [
  ['-first_name', true],
  ['-first_name,-last_name', true],
  ['cpf,phone', true],
  ['any', true],

  ['- first_name', false],
  ['-first_name, -last_name', false],
  ['cpf,+-phone', false],
  ['-+any', false],
  ['+any,', false],
  ['any,', false],
  ['any,key,', false],
  ['', false],
  [' ', false],
];

describe('sort-query-regex', () => {
  test.each(testCases)(
    `given %s testing with sortQueryRegex should result in %p`,
    async (objStringified: string, expectedMatchResult: boolean) => {
      expect(new RegExp(sortQueryRegex).test(objStringified)).toBe(expectedMatchResult);
    }
  );
});
