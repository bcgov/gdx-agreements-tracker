const useController = require("../useController/index.js");
const model = require("@models/contacts");
const what = { single: "contact", plural: "contacts" };
const controller = useController(model, what, "admin_form");

module.exports = controller;
