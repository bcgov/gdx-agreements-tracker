import { GridColDef, GridInitialState } from "@mui/x-data-grid";
import { useRenderTableCell } from "components/PLAYGROUND/hooks/useRenderTableCell";

export const tableConfig = () => {
  const defaultFlex = 3;
  const tableColumns: GridColDef[] = [
    {
      field: "deliverable_name",
      headerName: "Deliverable Name",
      flex: defaultFlex
    },
    { field: "description", headerName: "Description", flex: defaultFlex },
    { field: "start_date", headerName: "start_date", flex: defaultFlex },
    { field: "completion_date", headerName: "completion_date", flex: defaultFlex },
    { field: "deliverable_amount", headerName: "deliverable_amount", flex: defaultFlex },
    { field: "recoverable_amount", headerName: "recoverable_amount", flex: defaultFlex },
    { field: "project_number", headerName: "project_number", flex: defaultFlex },
    { field: "comments", headerName: "comments", flex: defaultFlex },
    { field: "fiscal", headerName: "fiscal", flex: defaultFlex },
    { field: "deliverable_status", headerName: "deliverable_status", flex: defaultFlex },
    { field: "health_id", headerName: "health_id", flex: defaultFlex },
    { field: "is_expense", headerName: "is_expense", flex: defaultFlex },
  ];

  const initialState = {
    filter: {
      filterModel: {
        items: [{ columnField: "status", operatorValue: "equals", value: "Active" }],
      },
    },
  };

  const modalToggleColumn = "deliverable_name"

  return { tableColumns, initialState, modalToggleColumn };
};

