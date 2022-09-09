import model from "../models/subcontractors";
import { IController } from "../types";
import { useController } from "./useController";

const what = { single: "subcontractor", plural: "subcontractors" };
const controller: IController = useController(model, `subcontractors_update_all`, what);

export default controller;