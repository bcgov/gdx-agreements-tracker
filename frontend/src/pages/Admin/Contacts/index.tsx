import React from "react";
import { Table } from "../../../components";
import { Typography } from "@mui/material";
import { columns } from "../../../dummyData/Contacts/columns";
import { rows } from "../../../dummyData/Contacts/rows";

export const Contacts = () => {
  return (
    <>
      <Typography variant="h5" component="h2">
        Contacts
      </Typography>
      <Table columns={columns} rows={rows} loading={false} />
    </>
  );
};
