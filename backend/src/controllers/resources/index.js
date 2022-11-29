const useController = require("../useController/index.js");
const model = require("@models/resources");
const what = { single: "resource", plural: "resources" };
const controller = useController(model, what, "admin_form");

module.exports = controller;
