const model = require("../models/resources");
const useController = require("./useController/index.js");

const what = { single: "resource", plural: "resources" };
const controller = useController(model, `resources_update_all`, what);

module.exports = controller;
