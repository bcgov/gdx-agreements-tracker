const useController = require("./useController/index.js");
const model = require("../models/project_status");
const what = { single: "project_status", plural: "project_statuses" };
const controller = useController(model, what);

module.exports = controller;
