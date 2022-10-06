import React, { FC } from "react";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { useFormatTableData } from "../../hooks";
import { Table } from "../../components";
import { Outlet, Link } from "react-router-dom";
export const Projects: FC = () => {
  const { data, isLoading } = useFormatTableData({
    tableName: "projects",
    apiEndPoint: "projects",
    columnWidths: {
      project_name: 3,
      portfolio_name: 2,
      project_manager: 2,
    },
  });

  const switchRender = () => {
    switch (isLoading) {
      case true:
        return <LinearProgress />;
      case false:
        return (
          <Table
            columns={data.columns}
            rows={data.rows}
            loading={isLoading}
            allowEdit={data?.user?.capabilities.includes("projects_update_one")}
          />
        );
      default:
        return <LinearProgress />;
    }
  };

  return (
    <>
      <Typography variant="h5" component="h2">
        Projects
      </Typography>
      {switchRender()}
      <Box m={1} display="flex" justifyContent="flex-end" alignItems="flex-end">
        <Button component={Link} to={"/projects/new"} variant="contained">
          New Project
        </Button>
      </Box>
      <Outlet />
    </>
  );
};
