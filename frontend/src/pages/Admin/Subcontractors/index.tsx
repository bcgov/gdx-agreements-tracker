import React, { FC } from "react";
import { Typography } from "@mui/material";
import { useFormatTableData } from "../../../hooks/";
import { Table } from "../../../components";

export const Subcontractors: FC = () => {
  const { rows, columns, loading } = useFormatTableData("subcontractors");
  return (
    <div style={{ height: "50vh", width: "200%" }}>
      <Typography variant="h5" component="h2">
        Subcontractors
      </Typography>
      <Table columns={columns} rows={rows} loading={loading} />
    </div>
  );
};
