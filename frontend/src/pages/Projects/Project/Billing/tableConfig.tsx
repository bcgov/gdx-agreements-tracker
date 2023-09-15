import { GridColDef } from "@mui/x-data-grid";
import { dateFormatter } from "utils/formatDate";

export const tableConfig = () => {
  const defaultFlex = 3;
  const tableColumns: GridColDef[] = [
    { field: "amount", headerName: "Amount", flex: defaultFlex },
    {
      field: "billed_date",
      headerName: "Billed Date",
      valueFormatter: dateFormatter,
      flex: defaultFlex,
    },
    { field: "financial_contact", headerName: "Financial Contact", flex: defaultFlex },
    { field: "jv_number", headerName: "Journal Voucher Number", flex: defaultFlex },
    { field: "fiscal", headerName: "Fiscal Year", flex: defaultFlex },
    { field: "quarter", headerName: "Quarter", flex: defaultFlex },
  ];

  const initialState = {
    filter: {
      filterModel: {
        items: [{ columnField: "amount", operatorValue: "equals", value: "Active" }],
      },
    },
  };

  return { tableColumns, initialState };
};
