import model from "../models/resources";
import { IController } from "../types";
import { useController } from "./useController";

const what = { single: "resource", plural: "resources" };

const controller: IController = useController(model, `${what.plural}_update_all`, what);

export default controller;