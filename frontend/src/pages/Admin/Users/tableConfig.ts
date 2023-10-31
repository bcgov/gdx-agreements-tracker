import { GridColDef } from "@mui/x-data-grid";

export const tableConfig = () => {
  const defaultFlex = 3;
  const tableColumns: GridColDef[] = [
    { field: "firstName", headerName: "First Name", flex: defaultFlex },
    { field: "lastName", headerName: "Last Name", flex: defaultFlex },
    { field: "email", headerName: "Email", flex: defaultFlex },
    { field: "role", headerName: "Role", flex: defaultFlex },
  ];

  return { tableColumns };
};
