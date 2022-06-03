import React, { FC } from "react";
import { LinearProgress, Typography } from "@mui/material";
import { useFormatTableData } from "../../../hooks/";
import { Table } from "../../../components";

export const Users: FC = () => {
  const { data, isLoading } = useFormatTableData("users");

  return (
    <>
      <Typography variant="h5" component="h2">
        Users
      </Typography>
      {!isLoading ? (
        <Table columns={data.columns} rows={data.rows} loading={isLoading} />
      ) : (
        <LinearProgress />
      )}
    </>
  );
};
