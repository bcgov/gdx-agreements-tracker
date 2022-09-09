import model from "../models/suppliers";
import { IController } from "../types";
import { useController } from "./useController";

const what = { single: "supplier", plural: "suppliers" };
const controller: IController = useController(model, "suppliers_read_all", what);

export default controller;