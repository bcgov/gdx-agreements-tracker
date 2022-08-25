import React, { FC } from "react";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { useFormatTableData } from "../../hooks";
import { Table } from "../../components";
import { Outlet, Link } from "react-router-dom";

/**
 * The page component for the contract section of the application
 *
 * @returns {JSX.Element} - Returns a Contracts component
 */

export const Contracts: FC = () => {
  const { data, isLoading } = useFormatTableData({
    tableName: "contracts",
    apiEndPoint: "contracts",
  });

  // A case statement which allows us to do a conditional render.  You cannot put a switch in the JSX so a function that return a switch is needed.
  const switchRender = () => {
    switch (isLoading) {
      case true:
        return <LinearProgress />;

      case false:
        return <Table columns={data?.columns} rows={data?.rows} loading={isLoading} />;
      default:
        return <LinearProgress />;
    }
  };

  return (
    <>
      <Typography variant="h5" component="h2">
        Contracts
      </Typography>
      {switchRender()}
      <Box m={1} display="flex" justifyContent="flex-end" alignItems="flex-end">
        <Button component={Link} to={"/contracts/new"} variant="contained">
          New Contract
        </Button>
      </Box>
      <Outlet />
    </>
  );
};
