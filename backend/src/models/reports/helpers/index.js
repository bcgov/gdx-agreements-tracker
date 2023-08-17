// libs
const _ = require("lodash");

/**
 * Groups items in a list by a specified property.
 *
 * @param   {Array}  list  - The list of items to be grouped.
 * @param   {string} group - The property name to group the items by. Default is "portfolio_name".
 * @returns {Array}        An array of objects, where each object represents a group and its associated items.
 *                         Each object has two properties: the specified 'group' property (key) and the array of items (value).
 */
const groupByProperty = (list = [], group = "portfolio_name") => {
  // Using lodash's chain function "_" to create a chainable sequence.
  // The input 'list' is wrapped in the chain and will be operated upon.
  const result = _(list)
    // Group the items in the list by the specified 'group' property.
    .groupBy(group)
    // After grouping, 'map' is used to convert the grouped items into a new format.
    .map((projects, key) => ({
      // The 'key' represents the value of the property used for grouping (e.g., portfolio_name).
      // Create an object with the 'group' property as the key (e.g., { portfolio_name: 'some_group_value' }).
      [group]: key,
      // The 'projects' represent an array containing all the items belonging to this group.
      // Add the 'projects' array as the value in the new object.
      projects,
    }))
    // 'value' is used to extract the final result from the lodash chain.
    .value();

  // Return the resulting array of grouped objects.
  return result;
};

/**
 * If a parameter filter has been selected, return only queries matching those parameters. Otherwise, return them all.
 *
 * @param {knex.queryBuilder}              queryBuilder - The query builder.
 * @param {string}                         column       - The name of the database column to filter on.
 * @param {string | number | Array | null} parameter    - The query parameter with which to filter results.
 */
const whereInArray = (queryBuilder, column, parameter) => {
  if (undefined !== parameter) {
    queryBuilder.whereIn(column, parameter.toString().split(","));
  }
};

/**
 * Gets a report with subtotals.
 *
 * @param   {Array}          report            - The report data.
 * @param   {Array}          subtotals         - The report subtotal data.
 * @param   {string}         propertyToGroupBy - The property to group the report data by.
 * @returns {Promise<Array>}                   An array of report Promise objects with subtotals added.
 */
const getReportWithSubtotals = async (report, subtotals, propertyToGroupBy) => {
  // Group the report data by the specified property
  const groupedReport = groupByProperty(report, propertyToGroupBy);

  // Use reduce to fold in subtotals for each group
  return _.reduce(
    groupedReport,
    (acc, report) =>
      getNewReportGroup({
        acc,
        report,
        subtotals,
        propertyToGroupBy,
      }),
    // initial value - empty array to hold each new report group with subtotals as they accumulate
    []
  );
};

// helper utilities for getting a Report grouped by a property, with subtotals for each group
const getNewReportGroup = ({ acc, report, subtotals, propertyToGroupBy }) =>
  // adds a new report group object with the project name and subtotals
  [
    ...acc,
    {
      project_name: getProjectName(report),
      ...report,
      subtotals: getReportGroupSubtotals(report, subtotals, propertyToGroupBy),
    },
  ];
const getProjectName = (report) =>
  // Get the project name from the first project in the report's projects array
  report?.projects?.[0]?.project_name || "";
const getReportGroupSubtotals = (report, subtotals, propertyToGroupBy) =>
  // Get the subtotals for the report group
  _.keyBy(subtotals, propertyToGroupBy)[report[propertyToGroupBy]];

module.exports = {
  getReportWithSubtotals,
  groupByProperty,
  whereInArray,
};
