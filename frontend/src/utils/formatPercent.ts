/**
 * Converts a floating-point value to a percentage string.
 *
 * @param   {number} value - The floating-point value to be converted.
 * @returns {string}       - The percentage string representation.
 * @throws {Error} - Throws an error if the input is not a valid number or not in the range [0, 1].
 */
const formatPercent = ({ value }: { value?: number }): string => {
  if (typeof value !== "number" || isNaN(value) || value < 0 || value > 1) {
    throw new Error(`
    Invalid ${typeof value} input "${value}" provided to formatPercent.

    Please provide a floating-point number in the range [0, 1].
    `);
  }

  // Convert to percentage and format the string
  const percentageValue = value * 100;
  return `${percentageValue}%`;
};

export default formatPercent;
