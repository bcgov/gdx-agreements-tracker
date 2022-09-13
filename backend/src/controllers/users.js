const useController = require("./useController/index.js");
const model = require("../models/users");
const what = { single: "user", plural: "users" };
const controller = useController(model, what);

module.exports = controller;
