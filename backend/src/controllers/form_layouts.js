const model = require("../models/form_layouts");
const useController = require("./useController/index.js");

const what = { single: "form_layouts", plural: "form_layouts" };
const controller = useController(model, "general_read_all", what);

module.exports = controller;
