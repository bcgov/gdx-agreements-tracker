import { TableData } from "components/TableData";
import React from "react";
import { useParams } from "react-router-dom";
import { editFields, readFields } from "./fields";

export const InvoiceProcessing = () => {
  const { id } = useParams();
  const roles = {
    get: "contracts_read_all",
    add: "contracts_add_one",
    update: "contracts_update_one",
    delete: "contracts_delete_one",
  };

  const url = {
    getAll: `contracts/${id}/invoices`,
    getOne: `invoices/{id}`,
    updateOne: `invoices/{id}`,
    addOne: `/invoices`,
    deleteOne: `invoices/{id}`,
  };
  return (
    <TableData
      itemName="Invoice"
      tableName="invoice"
      url={url}
      createFormInitialValues={{}}
      readFields={readFields}
      editFields={editFields}
      roles={roles}
    />
  );
};
