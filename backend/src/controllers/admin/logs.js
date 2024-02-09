const useController = require("../useController/index.js");
const model = require("@models/admin/logs");
const what = { single: "log", plural: "logs" };
const controller = useController(model, what, "admin_form");

module.exports = controller;
