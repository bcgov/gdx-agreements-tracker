const _ = require("lodash");

/**
 * If a parameter filter has been selected, return only queries matching those parameters. Otherwise, return them all.
 *
 * @param   {knex.queryBuilder} queryBuilder          - The query builder.
 * @param   {string}            column                - The name of the database column to filter on.
 * @param   {string | number | array | null}          - The query parameter with which to filter results.
 */
const whereInArray = function(queryBuilder, column, parameter) {
    if (undefined !== parameter) {
      queryBuilder.whereIn(
        column,
        _.castArray(parameter)[0].split(",")
      );
    }
  };

module.exports = {
    whereInArray,
}