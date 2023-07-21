import { GridColDef } from "@mui/x-data-grid";

export const tableConfig = () => {
  const defaultFlex = 3;

  const tableColumns: GridColDef[] = [
    { field: "fiscal_year", headerName: "Fiscal", flex: defaultFlex },
    { field: "description", headerName: "Description", flex: defaultFlex },
    { field: "is_expense", headerName: "Is Expense", flex: defaultFlex },
    { field: "completion_date", headerName: "Completion Date", flex: defaultFlex },
    { field: "deliverable_amount", headerName: "Deliverable Amount", flex: defaultFlex },
    { field: "deliverable_status", headerName: "Deliverable Status", flex: defaultFlex },
    { field: "comments", headerName: "Comments", flex: defaultFlex },
    { field: "deliverable_name", headerName: "Deliverable Name", flex: defaultFlex },
  ];

  const initialState = {
    filter: {
      filterModel: {
        items: [{ columnField: "fiscal", operatorValue: "equals", value: "Active" }],
      },
    },
  };

  return { tableColumns, initialState };
};
