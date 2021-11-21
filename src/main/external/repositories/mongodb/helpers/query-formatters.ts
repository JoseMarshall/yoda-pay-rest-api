/**
 * @description Apply a case insensitive regex pattern to a string
 * @param x The string to apply the regex to
 * @returns a RegExp object which does case insensitive matching with all text containing the passed string
 */
export const makeCaseInsensitiveRegex = (x: string): RegExp => new RegExp(`.*${x}.*`, 'i');

/**
 * @description Apply a formation to an object, applying the case insensitive regex pattern on each its string entries
 * @param query The object to format
 * @returns An object with case insensitive regex pattern in all of its string entries
 */
export const formatQueryToRegex = (query: Record<string, string>): Record<string, unknown> =>
  Object.keys(query).reduce((acc: Record<string, unknown>, queryKey: string) => {
    const value = query[queryKey];
    return typeof value !== 'string'
      ? { ...acc, [queryKey]: value }
      : { ...acc, [queryKey]: makeCaseInsensitiveRegex(value) };
  }, {});

/**
 * @description Convert a string to an object understandable by sort option in mongoose
 * @param str The string to be converted ex: `-name,+dob,+status`
 */
export const makeSortQuery = (str: string) =>
  str.split(',').reduce((result: Record<string, unknown>, curr) => {
    const sign = curr[0] === '-' ? -1 : 1;
    const key = curr.replace(/^(\+| |-){1}/, '');
    return { ...result, [key]: sign };
  }, {});
