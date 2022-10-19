import { TableComplete } from "components/TableComplete";
import React from "react";
import { useParams } from "react-router-dom";
import { editFields, readFields, initialValues } from "./fields";

export const Amendments = () => {
  const { contractId } = useParams();

  const roles = {
    get: "contracts_read_all",
    add: "contracts_add_one",
    update: "contracts_update_one",
    delete: "contracts_delete_one",
  };

  const url = {
    getAll: `contracts/${contractId}/amendments`,
    getOne: `contracts/${contractId}/amendments/{id}`,
    updateOne: `amendments/{id}`,
    addOne: `amendments`,
    deleteOne: `amendments/{id}`,
  };

  const columnWidths = {
    amendment_type: 2,
    description: 3,
  };

  return (
    <TableComplete
      itemName={"amendment"}
      tableName={"amendments"}
      columnWidths={columnWidths}
      url={url}
      createFormInitialValues={initialValues(contractId)}
      readFields={readFields}
      editFields={editFields}
      roles={roles}
    />
  );
};
