import { TableComplete } from "components/TableComplete";
import React from "react";
import { editFields, initialValues, readFields } from "./fields";

export const InvoiceDeliverables = ({
  invoiceId,
  contractId,
}: {
  invoiceId: number;
  contractId: number;
}) => {
  const roles = {
    get: "contracts_read_all",
    add: "contracts_add_one",
    update: "contracts_update_one",
    delete: "contracts_delete_one",
  };

  const url = {
    getAll: `invoices/${invoiceId}/deliverables`,
    getOne: `invoices/deliverables/{id}`,
    updateOne: `invoices/deliverables/{id}`,
    addOne: `invoices/${invoiceId}/deliverables`,
    deleteOne: ``,
  };

  const columnWidths = {
    deliverable_name: 3,
    type: 1,
    rate: 1,
  };

  return (
    <TableComplete
      itemName={"Deliverable"}
      tableName={"deliverables"}
      columnWidths={columnWidths}
      url={url}
      createFormInitialValues={initialValues}
      readFields={readFields}
      editFields={editFields(contractId)}
      totalColumns={["amount"]}
      roles={roles}
    />
  );
};
