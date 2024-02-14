import { GridColDef } from "@mui/x-data-grid";
import { dateFormatter } from "utils/formatDate";
import { sortComparatorByCurrency } from "utils/sortComparatorByCurrency";

export const tableConfig = () => {
  const defaultFlex = 3;
  const tableColumns: GridColDef[] = [
    { field: "jv_number", headerName: "Journal Voucher Number", flex: defaultFlex },
    {
      field: "billed_date",
      headerName: "Billed Date",
      valueFormatter: dateFormatter,
      flex: defaultFlex,
    },
    { field: "amount", headerName: "Amount", flex: defaultFlex, sortComparator: sortComparatorByCurrency(), },
    { field: "quarter", headerName: "Quarter", flex: defaultFlex },
    { field: "fiscal", headerName: "Fiscal Year", flex: defaultFlex },
    { field: "financial_contact", headerName: "Financial Contact", flex: defaultFlex },
  ];

  return { tableColumns };
};
