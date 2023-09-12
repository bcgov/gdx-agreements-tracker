import dayjs from "dayjs";

// date format for the short year format - to be used in javascript.
// the date format for database queries is defined in backend/src/models/reports/helpers/index.js
const DATE_FORMAT_SHORT_YEAR = "DD-MMM-YY";

/**
 * Format a date to the format "dd-Mon-yy"
 * e.g. 2021-01-01 -> 01-Jan-21
 *
 * @param   {string | unknown} date - date to be formatted
 * @returns {string}                - formatted date
 */
export default (date) => date && dayjs(date).format(DATE_FORMAT_SHORT_YEAR);
