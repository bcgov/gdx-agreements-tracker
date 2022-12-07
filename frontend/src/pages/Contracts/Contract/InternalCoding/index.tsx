import { TableComplete } from "components/TableComplete";
import React from "react";
import { useParams } from "react-router-dom";
import { editFields, readFields, initialValues } from "./fields";

export const InternalCoding = () => {
  const { contractId } = useParams();

  const roles = {
    get: "contracts_read_all",
    add: "contracts_add_one",
    update: "contracts_update_one",
    delete: "contracts_delete_one",
  };

  const url = {
    getAll: `contracts/${contractId}/internal-coding`,
    getOne: `contracts/internal-coding/{id}`,
    updateOne: `contracts/internal-coding/{id}`,
    addOne: `contracts/${contractId}/internal-coding`,
  };

  const columnWidths = {
    portfolio: 2,
    qualified_receiver: 2,
  };

  return (
    <TableComplete
      itemName={"Internal Coding"}
      tableName={"internal coding"}
      columnWidths={columnWidths}
      url={url}
      createFormInitialValues={initialValues}
      readFields={readFields}
      editFields={editFields}
      roles={roles}
    />
  );
};
