import { Link } from "@mui/material";
import { GridInitialState, GridRenderEditCellParams } from "@mui/x-data-grid";
import { useRenderCell } from "components/PLAYGROUND/Table/useRenderCell";
import React, { useState } from "react";

export const tableConfig = () => {

  const defaultFlex = 3;

  const [linkCell, selectedRow] = useRenderCell()

  const tableColumns = [
    { field: "project_number", headerName: "Project Number", flex: defaultFlex, renderCell: linkCell },
    { field: "project_name", headerName: "Project Name", flex: defaultFlex },
    { field: "version", headerName: "Version", flex: defaultFlex },
    { field: "portfolio_name", headerName: "Portfolio Name", flex: defaultFlex },
    { field: "project_manager", headerName: "Project Manager", flex: defaultFlex },
    { field: "registration_date", headerName: "Registration Date", flex: defaultFlex },
    { field: "end_date", headerName: "End Date", flex: defaultFlex },
    { field: "status", headerName: "Status", flex: defaultFlex },
  ];

  const initialState: GridInitialState = {
    filter: {
      filterModel: {
        items: [{ columnField: "status", operatorValue: "equals", value: "Active" }],
      },
    },
  };

  return [tableColumns, initialState, selectedRow];
};
