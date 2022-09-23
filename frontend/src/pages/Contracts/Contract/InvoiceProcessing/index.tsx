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

  const roles = {
    get: "contracts_read_all",
    add: "contracts_add_one",
    update: "contracts_update_one",
    delete: "contracts_delete_one",
  };

  const url = {
    getAll: `contracts/${contractId}/invoices`,
    getOne: `invoices/{id}`,
    updateOne: `invoices/{id}`,
    addOne: `/invoices`,
    deleteOne: `invoices/{id}`,
  };
  return (
    <TableData
      itemName="Invoice"
      tableName="invoice"
<<<<<<< HEAD:frontend/src/pages/Contracts/Contract/ContractDetails/InvoiceSection/index.tsx
      url={url}
=======
      getOneUrl={`invoices/{id}`}
      getAllUrl={`contracts/${id}/invoices`}
>>>>>>> f8133be (Renamed Contracts and Invoices controller and model function names to not override base functions.):frontend/src/pages/Contracts/Contract/InvoiceProcessing/index.tsx
      createFormInitialValues={{}}
      readFields={readFields}
      editFields={editFields}
      roles={roles}
    />
  );
};
