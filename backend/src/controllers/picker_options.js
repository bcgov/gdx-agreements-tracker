const model = require("../models/picker_options");
const useController = require("./useController/index.js");

const what = { single: "picker_options", plural: "picker_optionss" };
const controller = useController(model, "general_read_all", what);

module.exports = controller;
