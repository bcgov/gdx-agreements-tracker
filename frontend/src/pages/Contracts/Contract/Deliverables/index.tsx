import React from "react";

import { Grid } from "@mui/material";
import { GDXList } from "components/GDXList";
import { editFields, readFields } from "./fields";
import { TableComplete } from "components/TableComplete";


export const Deliverables = () => {
  const createFormInitialValues = {
    first_name: "",
    address: "",
    last_name: "",
    city: "",
    contact_title: "",
    province: "",
    ministry_id: {
      value: 0,
      label: "",
    },
    country: "",
    contact_phone: "",
    postal: "",
    mobile: "",
    website: "",
    email: "",
    notes: "",
  };

  const roles = {
    get: "admin_form_read_all",
    add: "admin_form_add_one",
    update: "admin_form_update_one",
    delete: "admin_form_delete_one",
  };

  const url = {
    getAll: `/contacts`,
    getOne: `/contacts/{id}`,
    updateOne: `/contacts/{id}`,
    addOne: `/contacts`,
  };

  return (
    <>
      <TableComplete
        itemName="Contacts"
        tableName="contact"
        url={url}
        createFormInitialValues={createFormInitialValues}
        readFields={readFields}
        editFields={editFields}
        roles={roles}
      />

      <Grid container spacing={2}>
        <Grid item xs={6} md={6}>
          <GDXList blocks={[[{ label: "test", value: "test" }]]} title={"test"} />
        </Grid>
        <Grid item xs={6} md={6}>
          <GDXList blocks={[[{ label: "test", value: "test" }]]} title={"test2"} />
        </Grid>
      </Grid>
    </>
  );
};
