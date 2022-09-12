const model = require("../models/contacts");
const useController = require("./useController/index.js");

const what = { single: "contact", plural: "contacts" };
const controller = useController(model, "contacts_update_all", what);

module.exports = controller;
