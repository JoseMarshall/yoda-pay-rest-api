import { sortByStringfiedRegex } from '../regex';

const testCases: (string | boolean | any)[][] = [
  ['{"any":1}', true],
  ['{"any":-1}', true],
  ['{"any":1,"any":1}', true],
  ['{"any":1,"any":-1}', true],
  ['{"any":1,"any":-1,"any":-1,"any":-1}', true],

  ['{"any":1,"any":-1,}', false],
  ['{"any":1"any":-1}', false],
  ['{"any":1,}', false],
  ['{"any":-1,}', false],
  ['{"any": 1}', false],
  ['{"any": -1}', false],
  ['{"any": 1,}', false],
  ['{"any": -1,}', false],
  ['{"any": 1,"any:1"}', false],
  ['{"any":1, "any":-1}', false],
  ['{ "any":1,"any":-1, }', false],
  ['{"any":1 "any":-1}', false],
  ['{"any":0 "any":1}', false],
  ['{"any":0}', false],
  ['{}', false],
  ['', false],
  [' ', false],
];

describe('object-stringified-regex', () => {
  test.each(testCases)(
    `given %s as obj stringified, 
    testing with sortByStringfiedRegex should result in %p`,
    async (objStringified: string, expectedMatchResult: boolean) => {
      expect(new RegExp(sortByStringfiedRegex).test(objStringified)).toBe(expectedMatchResult);
    }
  );
});
