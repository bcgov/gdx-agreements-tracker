import { GridColDef } from "@mui/x-data-grid";

export const tableConfig = () => {
  const defaultFlex = 3;
  const tableColumns: GridColDef[] = [
    { field: "label", headerName: "Label", flex: defaultFlex },
    { field: "value", headerName: "Value", flex: defaultFlex },
  ];

  const initialState = {};

  return { tableColumns, initialState };
};
