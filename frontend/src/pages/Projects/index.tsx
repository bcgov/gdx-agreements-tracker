import React, { FC } from "react";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { useFormatTableData } from "../../hooks";
import { Table } from "../../components";
import { Outlet, Link } from "react-router-dom";
export const Projects: FC = () => {

  const { data, isLoading } = useFormatTableData("projects");

  return (
    <>
      <Typography variant="h5" component="h2">
        Projects
      </Typography>
      {!isLoading ? (
        <Table columns={data.columns} rows={data.rows} loading={isLoading} />
      ) : (
        <LinearProgress />
      )}

      <Box m={1} display="flex" justifyContent="flex-end" alignItems="flex-end">
        <Button component={Link} to={"/projects/new"} variant="contained">
          New Project
        </Button>
      </Box>
      <Outlet />
    </>
  );
};