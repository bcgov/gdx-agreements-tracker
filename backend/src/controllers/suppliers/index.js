const useController = require("../useController/index.js");
const model = require("@models/suppliers");
const what = { single: "supplier", plural: "suppliers" };
const controller = useController(model, what, "admin_form");

module.exports = controller;
