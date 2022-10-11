import { TableComplete } from "components/TableComplete";
import React from "react";
import { useParams } from "react-router-dom";
import { initialValues } from "../ContractDetails/fields";
import { editFields, readFields } from "./fields";

export const Amendments = () => {
  const { id } = useParams();

  const roles = {
    get: "contracts_read_all",
    add: "contracts_add_one",
    update: "contracts_update_one",
    delete: "contracts_delete_one",
  };

  const url = {
    getAll: `contracts/${id}/amendments`,
    getOne: `contracts/${id}/amendments/{id}`,
    updateOne: `amendments/{id}`,
    addOne: `amendments`,
    deleteOne: `amendments/{id}`,
  };

  return (
    <TableComplete
      itemName={"amendment"}
      tableName={"amendments"}
      url={url}
      createFormInitialValues={initialValues}
      readFields={readFields}
      editFields={editFields}
      roles={roles}
    />
  );
};
