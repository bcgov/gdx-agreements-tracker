import React, { FC } from "react";
import { Typography } from "@mui/material";
import { useFormatTableData } from "../../../hooks/";
import { Table } from "../../../components";

export const Resources: FC = () => {
  const { data, isLoading } = useFormatTableData("resources");

  return (
    <>
      <Typography variant="h5" component="h2">
        Resources
      </Typography>
      {!isLoading ? (
        <Table columns={data.columns} rows={data.rows} loading={isLoading} />
      ) : (
        <div>Loading</div>
      )}
    </>
  );
};
