import model from "../models/picker_options";
import { IController } from "../types";
import { useController } from "./useController";

const what = { single: "picker_options", plural: "picker_optionss" };
const controller: IController = useController(model, "general_read_all", what);

export default controller;