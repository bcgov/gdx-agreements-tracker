import { GridColDef } from "@mui/x-data-grid";

export const tableConfig = () => {
  const defaultFlex = 3;
  const tableColumns: GridColDef[] = [
    {
      field: "deliverable_name",
      headerName: "Deliverable Name",
      flex: defaultFlex,
    },
    { field: "description", headerName: "Description", flex: defaultFlex },
    { field: "start_date", headerName: "Start Date", flex: defaultFlex },
    { field: "completion_date", headerName: "Completion Date", flex: defaultFlex },
    { field: "deliverable_amount", headerName: "Deliverable Amount", flex: defaultFlex },
    { field: "recoverable_amount", headerName: "Recoverable Amount", flex: defaultFlex },
    { field: "project_number", headerName: "Project Number", flex: defaultFlex },
    { field: "comments", headerName: "Comments", flex: defaultFlex },
    { field: "fiscal", headerName: "Fiscal", flex: defaultFlex },
    { field: "deliverable_status", headerName: "Deliverable Status", flex: defaultFlex },
    { field: "health_id", headerName: "Health ID", flex: defaultFlex },
    { field: "is_expense", headerName: "Is Expense", flex: defaultFlex },
  ];

  const initialState = {
    filter: {
      filterModel: {
        items: [{ columnField: "status", operatorValue: "equals", value: "Active" }],
      },
    },
  };

  const modalToggleColumn = "deliverable_name";

  return { tableColumns, initialState, modalToggleColumn };
};
