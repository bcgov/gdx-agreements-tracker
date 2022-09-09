import model from "../models/form_layouts";
import { IController } from "../types";
import { useController } from "./useController";

const what = { single: "form_layouts", plural: "form_layouts" };
const controller: IController = useController(model, "general_read_all", what);

export default controller;

