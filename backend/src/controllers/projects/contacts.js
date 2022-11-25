const useController = require("@controllers/useController");
const model = require("@models/projects/contacts");
const what = { single: "project contact", plural: "project contacts" };
const controller = useController(model, what, "projects");

module.exports = controller;
