import { TableComplete } from "components/TableComplete";
import React from "react";
import { useParams } from "react-router-dom";
import { editFields, initialValues, readFields } from "./fields";

export const ContractResources = () => {
  const { id } = useParams();

  const roles = {
    get: "contracts_read_all",
    add: "contracts_add_one",
    update: "contracts_update_one",
    delete: "contracts_delete_one",
  };

  const url = {
    getAll: `contracts/${id}/resources`,
    getOne: `contracts/resources/{id}`,
    updateOne: `contracts/resources/{id}`,
    addOne: `contracts/${id}/resources`,
    deleteOne: `contracts/resources/{id}`,
  };

  return (
    <TableComplete
      itemName={"resource"}
      tableName={"resources"}
      url={url}
      createFormInitialValues={initialValues}
      readFields={readFields}
      editFields={editFields}
      totalColumns={["assignment_rate", "hours", "fees_for_resource"]}
      roles={roles}
    />
  );
};
