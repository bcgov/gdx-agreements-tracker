import { GridColDef, GridInitialState } from "@mui/x-data-grid";
import { useRenderTableCell } from "components/PLAYGROUND/hooks/useRenderTableCell";

export const tableConfig = () => {
  const defaultFlex = 3;

  const tableColumns: GridColDef[] = [
    { field: "fiscal_year", headerName: "Fiscal", flex: defaultFlex },
    { field: "description", headerName: "description", flex: defaultFlex },
    { field: "is_expense", headerName: "is_expense", flex: defaultFlex },
    { field: "completion_date", headerName: "completion_date", flex: defaultFlex },
    { field: "deliverable_amount", headerName: "deliverable_amount", flex: defaultFlex },
    { field: "deliverable_status", headerName: "deliverable_status", flex: defaultFlex },
    { field: "comments", headerName: "comments", flex: defaultFlex },
    { field: "deliverable_name", headerName: "deliverable_name", flex: defaultFlex },
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
