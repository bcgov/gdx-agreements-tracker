const useController = require("./useController/index.js");
const model = require("../models/contracts.js");
const what = { single: "contract", plural: "contracts" };
const controller = useController(model, what);

module.exports = controller;
