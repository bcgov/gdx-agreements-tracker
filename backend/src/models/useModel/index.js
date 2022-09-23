const dbConnection = require("../../database/databaseConnection");
const { knex } = dbConnection();

const useModel = () => {
  /**
   * Generates minimum necessary delete and insert operations to update a linking table (ex. contracts -> contract_subcontractor -> subcontractors).
   *
   * @param   {string}      table          The name of the table to update.
   * @param   {Array}       inputArray     The array of objects to update with (should be in form: [{oneColumnName: [id], manyColumnName: [id]}]).
   * @param   {integer}     oneColumnValue The value of the one
   * @param   {string}      oneColumnName  The name of the one column (in the one to many relationship).
   * @param   {string}      manyColumnName The name of the many column (in the one to many relationship).
   * @param   {Transaction} trx            An existing Knex Transaction.
   * @returns {Array}
   */
  const diffInsert = async (
    table,
    inputArray,
    oneColumnValue,
    oneColumnName,
    manyColumnName,
    trx
  ) => {
    // If inputArray is empty, delete all rows for given oneColumnValue and return early, nothing to insert.
    if (0 === inputArray.length) {
      return [trx(table).where(oneColumnName, oneColumnValue).del()];
    }

    // Get all existing rows belonging to the oneCol column.
    const existing = await knex
      .select(oneColumnName, manyColumnName)
      .from(table)
      .where(oneColumnName, oneColumnValue);
    const existingManyIds = existing.map((row) => {
      return row[manyColumnName];
    });
    // Find which rows should be inserted (exist in inputArray but not in existing array).
    const toInsert = inputArray.filter((row) => {
      return !existingManyIds.includes(row[manyColumnName]);
    });

    const ret = [];
    // Delete existing rows that are not in the inputArray.
    ret.push(
      trx(table)
        .where(oneColumnName, oneColumnValue)
        .andWhere(
          manyColumnName,
          "not in",
          inputArray.map((row) => {
            return row[manyColumnName];
          })
        )
        .del()
    );
    // Insert new rows if there are any.
    if (toInsert.length > 0) {
      ret.push(trx(table).insert(toInsert));
    }

    return ret;
  };

  return {
    diffInsert,
  };
};
module.exports = useModel;
