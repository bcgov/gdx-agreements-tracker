import { GridColDef } from "@mui/x-data-grid";

export const tableConfig = () => {
  const defaultFlex = 3;
  const tableColumns: GridColDef[] = [
    { field: "Ministry/Organization Name", headerName: "Ministry Name", flex: defaultFlex },
    { field: "abbr", headerName: "Ministry Abr.", flex: defaultFlex },
    { field: "active", headerName: "Active", flex: defaultFlex },
  ];

  const initialState = {};

  return { tableColumns, initialState };
};
