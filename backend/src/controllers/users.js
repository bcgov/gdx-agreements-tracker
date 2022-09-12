const model = require("../models/users");
const useController = require("./useController/index.js");

const what = { single: "user", plural: "users" };
const controller = useController(model, "users_update_all", what);

module.exports = controller;
