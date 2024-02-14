import { GridColDef } from "@mui/x-data-grid";
import { dateFormatter } from "utils/formatDate";
import { sortComparatorByCurrency } from "utils/sortComparatorByCurrency";

export const tableConfig = () => {
  const defaultFlex = 3;

  const tableColumns: GridColDef[] = [
    { field: "fiscal", headerName: "Fiscal", flex: defaultFlex },
    { field: "resource", headerName: "Resource", flex: defaultFlex },
    { field: "assignment_role", headerName: "Assignment Role", flex: defaultFlex },
    {
      field: "supplier_rate",
      headerName: "Supplier Rate",
      flex: defaultFlex,
      sortComparator: sortComparatorByCurrency(),
    },
    {
      field: "assignment_rate",
      headerName: "Assignment Rate",
      flex: defaultFlex,
      sortComparator: sortComparatorByCurrency(),
    },
    { field: "hours", headerName: "Hours", flex: defaultFlex },
    {
      field: "fees_for_resource",
      headerName: "Fees For Resource",
      flex: defaultFlex,
      sortComparator: sortComparatorByCurrency(),
    },
    {
      field: "start_date",
      headerName: "Start Date",
      valueFormatter: dateFormatter,
      flex: defaultFlex,
    },
    { field: "end_date", headerName: "End Date", valueFormatter: dateFormatter, flex: defaultFlex },
  ];

  return { tableColumns };
};
