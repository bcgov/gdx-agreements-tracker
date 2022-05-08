import React, { FC } from "react";
import { Box, Button, FormControlLabel, Typography } from "@mui/material";
import { useFormatTableData } from "../../hooks";
import {  Table } from "../../components";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

export const Projects: FC = () => {
  const { rows, columns, loading } = useFormatTableData("projects");
  return (
    <>
      <Typography variant="h5" component="h2">
        Projects
      </Typography>
      <Table columns={columns} rows={rows} loading={loading} />
      <Box m={1} display="flex" justifyContent="flex-end" alignItems="flex-end">
        <Button component={Link} to={"/projects/new"} variant="contained">New Project</Button>
      </Box>
      <Outlet />
    </>
  );
};
