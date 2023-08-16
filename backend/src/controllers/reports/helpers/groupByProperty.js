// TODO: figure out if this is used anywhere and if so, move it to a more appropriate location
/**
 * Separates an array of projects into groups by a property.
 *
 * @param   {any[]}   rows     Array of projects ordered by the property to be grouped on.
 * @param   {string}  property Object property to group by.
 * @returns {any[][]}
 */
const groupByProperty = (rows, property) => {
  const groupedRows = [];
  let currentValue = rows[0][property];
  let currentGroup = [];
  for (let i = 0; i < rows.length; i++) {
    if (currentValue !== rows[i][property]) {
      groupedRows.push(currentGroup);
      currentValue = rows[i][property];
      currentGroup = [];
    }
    currentGroup.push(rows[i]);
  }
  if (currentGroup.length > 0) {
    groupedRows.push(currentGroup);
  }
  return groupedRows;
};

module.exports = groupByProperty;
