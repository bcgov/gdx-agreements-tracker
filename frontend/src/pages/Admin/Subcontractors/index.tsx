import React, { FC } from "react";
import { Typography } from "@mui/material";
import { useFormatTableData } from "../../../hooks/";
import { Table } from "../../../components";

export const Subcontractors: FC = () => {
  const { data, isLoading } = useFormatTableData({
    tableName: "subcontractors",
    apiEndPoint: "subcontractors",
  });

  return (
    <>
      <Typography variant="h5" component="h2">
        Subcontractors
      </Typography>
      {!isLoading ? (
        <Table columns={data.columns} rows={data.rows} loading={isLoading} />
      ) : (
        <div>Loading</div>
      )}
    </>
  );
};
