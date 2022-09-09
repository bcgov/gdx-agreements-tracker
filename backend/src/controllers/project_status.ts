import model from "../models/project_status";
import { IController } from "../types";
import { useController } from "./useController";

const what = { single: "project_status", plural: "project_statuss" };
const controller: IController = useController(model, `project_status_update_all`, what);

export default controller;