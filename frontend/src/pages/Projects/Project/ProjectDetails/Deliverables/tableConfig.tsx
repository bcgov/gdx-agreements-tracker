import { GridColDef } from "@mui/x-data-grid";
import { dateFormatter } from "utils/formatDate";
import percentFormatter from "utils/formatPercent";

export const tableConfig = () => {
  const defaultFlex = 4;
  const smallFlex = 3;
  const lineBreakStyle = { lineHeight: "1.5em" };

  const lineBreak = (l1: string, l2: string) => (
    <div style={lineBreakStyle}>
      <span>{l1}</span>
      <br />
      <span>{l2}</span>
    </div>
  );

  const tableColumns: GridColDef[] = [
    {
      field: "deliverable_name",
      headerName: "Deliverable Name",
      flex: defaultFlex,
      renderHeader: (): JSX.Element => lineBreak("Deliverable", "Name"),
    },
    {
      field: "start_date",
      headerName: "Start Date",
      valueFormatter: dateFormatter,
      flex: defaultFlex,
      renderHeader: (): JSX.Element => lineBreak("Start", "Date"),
    },
    {
      field: "completion_date",
      headerName: "End Date",
      valueFormatter: dateFormatter,
      flex: defaultFlex,
      renderHeader: (): JSX.Element => lineBreak("End", "Date"),
    },
    {
      field: "deliverable_amount",
      headerName: "Deliverable Amount",
      flex: defaultFlex,
      renderHeader: (): JSX.Element => lineBreak("Deliverable", "Amount"),
    },
    {
      field: "recoverable_amount",
      headerName: "Recoverable Amount",
      flex: defaultFlex,
      renderHeader: (): JSX.Element => lineBreak("Recoverable", "Amount"),
    },
    { field: "fiscal", headerName: "Fiscal", flex: defaultFlex },
    {
      field: "percent_complete",
      headerName: "Percent Complete",
      valueFormatter: percentFormatter,
      flex: defaultFlex,

      renderHeader: (): JSX.Element => lineBreak("Percent", "Complete"),
    },
    {
      field: "deliverable_status",
      headerName: "Deliverable Status",
      flex: defaultFlex,
      renderHeader: (): JSX.Element => lineBreak("Deliverable", "Status"),
    },
    {
      field: "health_id",
      headerName: "Health",
      flex: smallFlex,
    },
  ];

  const initialState = {
    filter: {
      filterModel: {
        items: [{ columnField: "status", operatorValue: "equals", value: "Active" }],
      },
    },
  };

  const modalToggleColumn = "deliverable_name";

  return { tableColumns, initialState, modalToggleColumn };
};
