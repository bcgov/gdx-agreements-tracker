const useCommonComponents = require("./useCommonComponents/index.js")
/**
 * Get health of CHES
 *
 * @param   {string} healthApi API route used to get health of CHES.
 * @returns {object}
 */

 const controller = useCommonComponents("/api/v1","ches");

 module.exports = controller;
 