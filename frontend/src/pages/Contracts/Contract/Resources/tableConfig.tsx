import { GridColDef, GridInitialState } from "@mui/x-data-grid";
import { useRenderTableCell } from "components/PLAYGROUND/hooks/useRenderTableCell";

export const tableConfig = () => {
  const defaultFlex = 3;

  const tableColumns: GridColDef[] = [
    { field: "fiscal", headerName: "fiscal", flex: defaultFlex },
    { field: "resource", headerName: "resource", flex: defaultFlex },
    { field: "assignment_role", headerName: "assignment_role", flex: defaultFlex },
    { field: "supplier_rate", headerName: "supplier_rate", flex: defaultFlex },
    { field: "assignment_rate", headerName: "assignment_rate", flex: defaultFlex },
    { field: "hours", headerName: "hours", flex: defaultFlex },
    { field: "fees_for_resource", headerName: "fees_for_resource", flex: defaultFlex },
    { field: "start_date", headerName: "start_date", flex: defaultFlex },
    { field: "end_date", headerName: "end_date", flex: defaultFlex },
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
