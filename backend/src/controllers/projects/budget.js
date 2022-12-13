const useController = require("@controllers/useController");
const model = require("@models/projects/budget");
const what = { single: "budget", plural: "budgets" };
const controller = useController(model, what, "projects");

module.exports = controller;
