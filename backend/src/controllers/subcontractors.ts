const log = require("../facilities/logging.js")(module.filename);
import model from "../models/subcontractors.js";
const what = { single: "subcontractor", plural: "subcontractors" };


import { IController } from "../types";
import { useController } from "./useController";

const controller: IController = useController(model, `${what.plural}_update_all`, what);

export default controller;