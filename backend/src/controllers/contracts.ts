import model from "../models/contracts.js";
const what = { single: "contracts", plural: "contracts" };

import { IController } from "../types";
import { useController } from "./useController";

const controller: IController = useController(model, "contracts_read_all", what);

export default controller;
