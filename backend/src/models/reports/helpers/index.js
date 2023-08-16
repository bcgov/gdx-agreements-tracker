
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
        // If the parameter is not an array, transform it into one so we can use the .whereIn() function.
        parameter instanceof Array ? parameter[0].split(",") : [parameter]
      );
    }
  };

module.exports = {
    whereInArray,
}