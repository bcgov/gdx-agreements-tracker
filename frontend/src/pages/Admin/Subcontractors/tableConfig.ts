import { GridColDef } from "@mui/x-data-grid";

export const tableConfig = () => {
  const defaultFlex = 3;
  const tableColumns: GridColDef[] = [
    { field: "subcontractor_name", headerName: "Subcontractor Name", flex: defaultFlex },
  ];

  const initialState = {
    
  };

  return { tableColumns, initialState };
};
