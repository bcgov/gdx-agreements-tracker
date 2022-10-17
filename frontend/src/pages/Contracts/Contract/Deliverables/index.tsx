import React from "react";
import { Grid } from "@mui/material";
import { editFields, readFields, createFormInitialValues } from "./fields";
import { TableComplete } from "components/TableComplete";
import { useParams } from "react-router-dom";

export const Deliverables = () => {
  const { contractId } = useParams();

  const roles = {
    get: "contracts_read_all",
    add: "contracts_add_one",
    update: "contracts_update_one",
    delete: "contracts_delete_one",
  };

  const url = {
    getAll: `contracts/${contractId}/deliverables`,
    getOne: `contracts/deliverables/{id}`,
    updateOne: `contracts/deliverables/{id}`,
    addOne: `contracts/${contractId}/deliverables`,
    deleteOne: `contracts/deliverables/{id}`,
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <TableComplete
            itemName="Deliverables"
            tableName="contract"
            url={url}
            createFormInitialValues={createFormInitialValues}
            readFields={readFields}
            editFields={editFields}
            roles={roles}
          />
        </Grid>
      </Grid>
    </>
  );
};
