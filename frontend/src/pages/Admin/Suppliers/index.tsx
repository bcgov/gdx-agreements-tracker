import React, { FC, useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { useFormatTabledData } from "../../../hooks/";
import { Table } from "../../../components";

export const Suppliers: FC = () => {
  const { rows, columns } = useFormatTabledData();

  return (
    <div style={{ height: "50vh", width: "200%" }}>
      <Typography variant="h5" component="h2">
        Suppliers
      </Typography>
      <Table columns={columns} rows={rows} />
    </div>
  );
};
