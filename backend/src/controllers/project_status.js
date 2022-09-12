const model = require("../models/project_status");
const useController = require("./useController/index.js");

const what = { single: "project_status", plural: "project_statuss" };
const controller = useController(model, `project_status_update_all`, what);

module.exports = controller;
