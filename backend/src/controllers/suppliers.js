const model = require("../models/suppliers");
const useController = require("./useController/index.js");

const what = { single: "supplier", plural: "suppliers" };
const controller = useController(model, "suppliers_read_all", what);

module.exports = controller;
