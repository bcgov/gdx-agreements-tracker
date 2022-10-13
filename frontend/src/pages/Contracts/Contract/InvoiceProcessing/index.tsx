import { Grid } from "@mui/material";
import { TableComplete } from "components/TableComplete";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { editFields, initialValues, readFields } from "./fields";
import { InvoiceDeliverables } from "./InvoiceDeliverables";
import { InvoiceResources } from "./InvoiceResources";

export const InvoiceProcessing = () => {
  const { id } = useParams();
  const [invoiceId, setInvoiceId] = useState(0);

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
    addOne: `contracts/${id}/invoices`,
    deleteOne: `invoices/{id}`,
  };

  return (
    <>
      <TableComplete
        itemName="Invoice"
        tableName="invoice"
        url={url}
        createFormInitialValues={initialValues}
        readFields={readFields}
        editFields={editFields}
        totalColumns={["invoice_total"]}
        roles={roles}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getSelectedRow={(row: any) => {
          setInvoiceId(row.id);
        }}
      />
      {invoiceId > 0 && (
        <Grid container spacing={2}>
          <Grid item md={6} sm={12}>
            <InvoiceResources invoiceId={invoiceId} contractId={Number(id)} />
          </Grid>
          <Grid item md={6} sm={12}>
            <InvoiceDeliverables invoiceId={invoiceId} contractId={Number(id)} />
          </Grid>
        </Grid>
      )}
    </>
  );
};
