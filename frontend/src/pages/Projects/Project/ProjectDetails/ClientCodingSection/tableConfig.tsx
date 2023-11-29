import { GridColDef } from "@mui/x-data-grid";

export const tableConfig = () => {
  const defaultFlex = 3;
  const tableColumns: GridColDef[] = [
    {
      field: "program_area",
      headerName: "Program Area",
      flex: defaultFlex,
    },
    { field: "service_line", headerName: "Service Line", flex: defaultFlex },
    { field: "client", headerName: "Client", flex: defaultFlex },
    { field: "contact", headerName: "Financial Contact", flex: defaultFlex },
    { field: "expense_authority_name", headerName: "Expense Authority Name", flex: defaultFlex },
    { field: "stob", headerName: "STOB", flex: defaultFlex },
    { field: "responsibility_centre", headerName: "Responsibility Centre", flex: defaultFlex },
    { field: "project_code", headerName: "Project Code", flex: defaultFlex },
    { field: "client_amount", headerName: "Client Amount", flex: defaultFlex },
  ];

  const initialState = {
    filter: {
      filterModel: {
        items: [{ columnField: "program_area", operator: "equals", value: "Active" }],
      },
    },
  };

  return { tableColumns, initialState };
};
