const useController = require("../useController/index.js");
const model = require("@models/form_layouts");
const what = { single: "form_layout", plural: "form_layouts" };
const controller = useController(model, what, "general");

module.exports = controller;
