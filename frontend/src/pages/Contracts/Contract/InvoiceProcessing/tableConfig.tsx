import { GridColDef } from "@mui/x-data-grid";

export const tableConfig = () => {
  const defaultFlex = 3;
  const tableColumns: GridColDef[] = [
    { field: "received_date", headerName: "Received Date", flex: defaultFlex },
    { field: "invoice_date", headerName: "Invoice Date", flex: defaultFlex },
    { field: "due_date", headerName: "Due Date", flex: defaultFlex },
    { field: "billing_period", headerName: "Billing Period", flex: defaultFlex },
    { field: "fiscal", headerName: "Fiscal", flex: defaultFlex },
    { field: "invoice_total", headerName: "Invoice Total", flex: defaultFlex },
    { field: "invoice_number", headerName: "Invoice Number", flex: defaultFlex },
    { field: "is_gl", headerName: "Is Gl", flex: defaultFlex },
    { field: "notes", headerName: "Notes", flex: defaultFlex },
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
