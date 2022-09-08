import model from "../models/suppliers.js";
const what = { single: "supplier", plural: "suppliers" };

import { IController } from "../types";
import { useController } from "./useController";

const controller: IController = useController(model, "suppliers_read_all", what);

export default controller;