import { TableComplete } from "components/TableComplete";
import React from "react";
import { useParams } from "react-router-dom";
import { editFields, initialValues, readFields } from "./fields";

export const InvoiceDeliverables = () => {
  const { contractId } = useParams();

  const roles = {
    get: "contracts_read_all",
    add: "contracts_add_one",
    update: "contracts_update_one",
    delete: "contracts_delete_one",
  };

  const url = {
    getAll: `invoices/${contractId}/deliverables`,
    getOne: `invoices/deliverables/{id}`,
    updateOne: ``,
    addOne: ``,
    deleteOne: ``,
  };

  return (
    <TableComplete
      itemName={"deliverable"}
      tableName={"deliverables"}
      url={url}
      createFormInitialValues={initialValues}
      readFields={readFields}
      editFields={editFields}
      totalColumns={["rate"]}
      roles={roles}
    />
  );
};
