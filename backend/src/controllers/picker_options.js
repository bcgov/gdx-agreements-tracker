const useController = require("./useController/index.js");
const model = require("../models/picker_options");
const what = { single: "picker_option", plural: "picker_options" };
const controller = useController(model, what, "general");

module.exports = controller;
