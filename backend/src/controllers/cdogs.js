const useCommonComponents = require("./useCommonComponents/index.js")

/**
 * Get health of CDOGS
 *
 * @param   {string} healthApi API route used to get health of CDOGS.
 * @returns {object}
 */

const controller = useCommonComponents("/api/v2","cdogs");

module.exports = controller;
