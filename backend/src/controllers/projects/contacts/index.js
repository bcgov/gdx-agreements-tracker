const useController = require("../../../controllers/useController/index.js");
const model = require("../../../models/projects/contacts");
const what = { single: "project contact", plural: "project contacts" };
const controller = useController(model, what, "projects");

module.exports = controller;
