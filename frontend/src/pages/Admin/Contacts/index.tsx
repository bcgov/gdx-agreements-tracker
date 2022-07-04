import React, { FC } from "react";
import { Typography } from "@mui/material";
import { useFormatTableData } from "../../../hooks/";
import { Table } from "../../../components";

export const Contacts: FC = () => {
  const { data, isLoading } = useFormatTableData({
    tableName: "contacts",
    ApiEndPoint: "contacts",
  });

  return (
    <>
      <Typography variant="h5" component="h2">
        Contacts
      </Typography>
      {!isLoading ? (
        <Table columns={data.columns} rows={data.rows} loading={isLoading} />
      ) : (
        <div>Loading</div>
      )}
    </>
  );
};
