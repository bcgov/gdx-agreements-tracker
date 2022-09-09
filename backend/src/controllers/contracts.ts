import model from "../models/contracts";
import { IController } from "../types";
import { useController } from "./useController";

const what = { single: "contracts", plural: "contracts" };
const controller: IController = useController(model, "contracts_read_all", what);

export default controller;
