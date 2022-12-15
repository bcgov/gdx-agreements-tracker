const useController = require("@controllers/useController");
const model = require("@models/projects/deliverable");
const what = { single: "deliverable", plural: "deliverables" };
const controller = useController(model, what, "projects");

module.exports = controller;
