import model from "../models/ministry";
import { IController } from "../types";
import { useController } from "./useController";

const what = { single: "ministry", plural: "ministries" };
const controller: IController = useController(model, "ministries_update_all", what);

export default controller;
