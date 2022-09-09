import model from "../models/users";
import { IController } from "../types";
import { useController } from "./useController";

const what = { single: "user", plural: "users" };
const controller: IController = useController(model, "users_update_all", what);

export default controller;