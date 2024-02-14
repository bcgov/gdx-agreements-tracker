import { GridColDef } from "@mui/x-data-grid";
import { dateFormatter } from "utils/formatDate";
import percentFormatter from "utils/formatPercent";
import LineBreak from "utils/LineBreak";
import { sortComparatorByCurrency } from "utils/sortComparatorByCurrency";

export const tableConfig = () => {
  const defaultFlex = 4;
  const smallFlex = 3;

  const tableColumns: GridColDef[] = [
    {
      field: "deliverable_name",
      headerName: "Deliverable Name",
      flex: defaultFlex,
      renderHeader: (): JSX.Element => LineBreak("Deliverable", "Name"),
    },
    {
      field: "start_date",
      headerName: "Start Date",
      valueFormatter: dateFormatter,
      flex: defaultFlex,
      renderHeader: (): JSX.Element => LineBreak("Start", "Date"),
    },
    {
      field: "completion_date",
      headerName: "End Date",
      valueFormatter: dateFormatter,
      flex: defaultFlex,
      renderHeader: (): JSX.Element => LineBreak("End", "Date"),
    },
    {
      field: "deliverable_amount",
      headerName: "Deliverable Amount",
      flex: defaultFlex,
      renderHeader: (): JSX.Element => LineBreak("Deliverable", "Amount"),
      sortComparator: sortComparatorByCurrency(),
    },
    {
      field: "recoverable_amount",
      headerName: "Recoverable Amount",
      flex: defaultFlex,
      renderHeader: (): JSX.Element => LineBreak("Recoverable", "Amount"),
      sortComparator: sortComparatorByCurrency(),
    },
    { field: "fiscal", headerName: "Fiscal", flex: defaultFlex },
    {
      field: "percent_complete",
      headerName: "Percent Complete",
      valueFormatter: percentFormatter,
      flex: defaultFlex,

      renderHeader: (): JSX.Element => LineBreak("Percent", "Complete"),
    },
    {
      field: "deliverable_status",
      headerName: "Deliverable Status",
      flex: defaultFlex,
      renderHeader: (): JSX.Element => LineBreak("Deliverable", "Status"),
    },
    {
      field: "health_id",
      headerName: "Health",
      flex: smallFlex,
    },
  ];

  const modalToggleColumn = "deliverable_name";

  return { tableColumns, modalToggleColumn };
};
