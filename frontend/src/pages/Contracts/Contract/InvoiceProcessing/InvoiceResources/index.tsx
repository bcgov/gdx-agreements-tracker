import { TableData } from "components/TableData";
import React, { useEffect, useState } from "react";
import { editFields, initialValues, readFields } from "./fields";

export const InvoiceResources = ({
  invoiceId,
  contractId,
}: {
  invoiceId: number;
  contractId: number;
}) => {
  const [id, setId] = useState(0);

  useEffect(() => {
    setId(invoiceId);
  }, [invoiceId]);

  const roles = {
    get: "contracts_read_all",
    add: "contracts_add_one",
    update: "contracts_update_one",
    delete: "contracts_delete_one",
  };

  const url = {
    getAll: `invoices/${id}/resources`,
    getOne: `/invoices/resources/{id}`,
    updateOne: ``,
    addOne: ``,
    deleteOne: ``,
  };

  return (
    <TableData
      itemName={"resource"}
      tableName={"resources"}
      url={url}
      createFormInitialValues={initialValues}
      readFields={readFields}
      editFields={editFields(contractId)}
      roles={roles}
    />
  );
};
