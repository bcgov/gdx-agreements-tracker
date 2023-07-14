import { GridColDef } from "@mui/x-data-grid";

export const tableConfig = () => {
  const defaultFlex = 3;
  const tableColumns: GridColDef[] = [
    { field: "last_name", headerName: "Last Name", flex: defaultFlex },
    { field: "first_name", headerName: "First Name", flex: defaultFlex },
    { field: "contact_title", headerName: "Job Title", flex: defaultFlex },
    { field: "ministry_id", headerName: "Ministry", flex: defaultFlex },
    { field: "notes", headerName: "Notes", flex: defaultFlex },

];

  const initialState = {
    filter: {
      filterModel: {
        items: [{ columnField: "last_name", operatorValue: "equals", value: "Active" }],
      },
    },
  };

  return { tableColumns, initialState };
};
