import { makeSortQuery } from '../query-formatters';

const testCases: (string | Record<string, 1 | -1> | any)[][] = [
  ['firstName,lastName', { firstName: 1, lastName: 1 }],
  ['-firstName,+lastName', { firstName: -1, lastName: 1 }],
  ['firstName,-lastName', { firstName: 1, lastName: -1 }],
  ['-firstName,-lastName', { firstName: -1, lastName: -1 }],
];

describe('format value in query object to regex ', () => {
  test.each(testCases)(
    `given %o as query object, 
    the result should be %o`,
    async (query: string, expectedResult: Record<string, number>) => {
      expect(makeSortQuery(query)).toEqual(expectedResult);
    }
  );
});
