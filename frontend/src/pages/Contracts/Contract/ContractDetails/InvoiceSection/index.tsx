import { TableData } from "components/TableData";
import React from "react";
import { useParams } from "react-router-dom";
import { editFields, readFields } from "./fields";

export const InvoiceSection = () => {
  const { contractId } = useParams();

  return (
    <TableData
      itemName="Invoice"
      tableName="invoice"
      getOneUrl={`invoices/{id}`}
      getAllUrl={`contracts/${contractId}/invoices`}
      createFormInitialValues={{}}
      readFields={readFields}
      editFields={editFields}
    />
  );
};
