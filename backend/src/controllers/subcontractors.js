const model = require("../models/subcontractors");
const useController = require("./useController/index.js");

const what = { single: "subcontractor", plural: "subcontractors" };
const controller = useController(model, `subcontractors_update_all`, what);

module.exports = controller;
