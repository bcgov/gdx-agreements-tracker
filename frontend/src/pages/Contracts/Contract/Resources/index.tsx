import { TableComplete } from "components/TableComplete";
import React from "react";
import { useParams } from "react-router-dom";
import { editFields, initialValues, readFields } from "./fields";

export const ContractResources = () => {
  const { contractId } = useParams();

  const roles = {
    get: "contracts_read_all",
    add: "contracts_add_one",
    update: "contracts_update_one",
    delete: "contracts_delete_one",
  };

  const url = {
    getAll: `contracts/${contractId}/resources`,
    getOne: `contracts/resources/{id}`,
    updateOne: `contracts/resources/{id}`,
    addOne: `contracts/${contractId}/resources`,
    deleteOne: `contracts/resources/{id}`,
  };

  const columnWidths = {
    resource: 2,
  };

  return (
    <TableComplete
      itemName={"Resources"}
      tableName={"resources"}
      url={url}
      columnWidths={columnWidths}
      createFormInitialValues={initialValues}
      readFields={readFields}
      editFields={editFields}
      totalColumns={["assignment_rate", "hours", "fees_for_resource"]}
      roles={roles}
    />
  );
};
