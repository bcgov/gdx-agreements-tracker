import { GridColDef } from "@mui/x-data-grid";

export const tableConfig = () => {
  const defaultFlex = 3;
  const tableColumns: GridColDef[] = [
    { field: "last_name", headerName: "Last Name", flex: defaultFlex },
    { field: "first_name", headerName: "First Name", flex: defaultFlex },
    { field: "subcontractor", headerName: "Subcontractor", flex: defaultFlex },
    { field: "supplier", headerName: "Supplier", flex: defaultFlex },
  ];

  const initialState = {
    filter: {},
  };

  return { tableColumns, initialState };
};
