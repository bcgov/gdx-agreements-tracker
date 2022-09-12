const model = require("../models/ministry");
const useController = require("./useController/index.js");

const what = { single: "ministry", plural: "ministries" };
const controller = useController(model, "ministries_update_all", what);

module.exports = controller;
