const useController = require("../useController/index.js");
const model = require("@models/admin/subcontractors");
const what = { single: "subcontractor", plural: "subcontractors" };
const controller = useController(model, what, "admin_form");

module.exports = controller;
