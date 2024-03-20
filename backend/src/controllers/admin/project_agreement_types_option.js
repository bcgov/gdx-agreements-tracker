const useController = require("@controllers/useController");
const model = require("@models/admin/project_agreement_types_option");
const what = { single: "lesson learned", plural: "lessons learned" };
const controller = useController(model, what, "projects");

module.exports = controller;
