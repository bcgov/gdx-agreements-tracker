const useController = require("@controllers/useController");
const model = require("@models/projects/lessonsLearned");
const what = { single: "lesson learned", plural: "lessons learned" };
const controller = useController(model, what, "projects");

module.exports = controller;
