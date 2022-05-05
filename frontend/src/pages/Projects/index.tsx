import React, { FC } from "react";
import { Typography } from "@mui/material";
import { useFormatTableData } from "../../hooks";
import { Main, Table } from "../../components";
import { Outlet } from "react-router-dom";

export const Projects: FC = () => {
  const { rows, columns, loading } = useFormatTableData("projects");
  return (
    <Main>
      <Typography variant="h5" component="h2">
        Projects
      </Typography>
      <Table columns={columns} rows={rows} loading={loading} />
      <Outlet />
    </Main>
  );
};
