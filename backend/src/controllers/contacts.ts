
import model from "../models/contacts.js";
const what = { plural: "contacts" };

import { IController } from "../types";
import { useController } from "./useController";

const controller: IController = useController(model, "contacts_update_all", what);

export default controller;