/**
 * Safely converts a string to an integer.
 * @param s A string to convert into a number.
 * @param radix A value between 2 and 36 that specifies the base of the number in numString.
 * If this argument is not supplied, strings with a prefix of '0x' are considered hexadecimal.
 * All other strings are considered decimal.
 */
export const safeParseInt = (s: string, radix?: number) => {
  const parsedData = parseInt(s, radix);
  return Number.isNaN(parsedData) ? 0 : parsedData;
};

/**
 * Safely parses a string to a Boolean.
 * @return `true` if `s` matches `"true"` (case insensitive); `false` otherwise
 * @param s the string to be parsed
 */
export const safeParseBoolean = (s: string) => /^true$/i.test(s);
