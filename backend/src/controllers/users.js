const model = require("../models/users.js");
const what = { single: "user", plural: "users" };

const controller = require("./useController.ts")(model, "users_read_all", what);

module.exports = controller;
