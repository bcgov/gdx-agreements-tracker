import React from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { Box, styled } from "@mui/material";
import { ITable } from "../../types";



const StyledBox = styled(Box)({
  overflowX: "scroll",
  height: "50vh",
  width:"100%"
});

export const Table = ({ columns, rows, loading }: ITable) => {
  return (
    <StyledBox>
      <DataGrid rows={rows} columns={columns} loading={loading} disableExtendRowFullWidth={true}/>
    </StyledBox>
  );
};
