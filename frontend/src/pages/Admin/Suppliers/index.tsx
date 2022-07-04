import React, { FC } from "react";
import { LinearProgress, Typography } from "@mui/material";
import { useFormatTableData } from "../../../hooks/";
import { Table } from "../../../components";

export const Suppliers: FC = () => {
  const { data, isLoading } = useFormatTableData({
    tableName: "suppliers",
    ApiEndPoint: "suppliers",
  });

  return (
    <>
      <Typography variant="h5" component="h2">
        Suppliers
      </Typography>
      {!isLoading ? (
        <Table columns={data.columns} rows={data.rows} loading={isLoading} />
      ) : (
        <LinearProgress />
      )}
    </>
  );
};
