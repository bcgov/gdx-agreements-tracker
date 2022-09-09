const model = require("../models/contracts.js");
const useController = require("./useController/index.js");

const what = { single: "contracts", plural: "contracts" };
const controller = useController(model, "contracts_read_all", what);

module.exports = controller;
