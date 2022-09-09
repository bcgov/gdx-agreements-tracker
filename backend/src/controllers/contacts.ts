import model from "../models/contacts";
import { IController } from "../types";
import { useController } from "./useController";

const what = { single: "contact", plural: "contacts" };
const controller: IController = useController(model, "contacts_update_all", what);

export default controller;