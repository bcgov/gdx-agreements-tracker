import { GridColDef, GridInitialState } from "@mui/x-data-grid";
import { useRenderTableCell } from "components/PLAYGROUND/hooks/useRenderTableCell";

export const tableConfig = () => {
  const defaultFlex = 3;
  const tableColumns: GridColDef[] = [
    { field: "received_date", headerName: "received_date", flex: defaultFlex },
    { field: "invoice_date", headerName: "invoice_date", flex: defaultFlex },
    { field: "due_date", headerName: "due_date", flex: defaultFlex },
    { field: "billing_period", headerName: "billing_period", flex: defaultFlex },
    { field: "fiscal", headerName: "fiscal", flex: defaultFlex },
    { field: "invoice_total", headerName: "invoice_total", flex: defaultFlex },
    { field: "invoice_number", headerName: "invoice_number", flex: defaultFlex },
    { field: "is_gl", headerName: "is_gl", flex: defaultFlex },
    { field: "notes", headerName: "notes", flex: defaultFlex },
  ];

  const initialState = {
    filter: {
      filterModel: {
        items: [{ columnField: "received_date", operatorValue: "equals", value: "Active" }],
      },
    },
  };

  return { tableColumns, initialState };
};
