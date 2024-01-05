import { GridColDef } from "@mui/x-data-grid";
import { dateFormatter } from "utils/formatDate";
import percentFormatter from "utils/formatPercent";

export const tableConfig = () => {
  const defaultFlex = 3;
  const tableColumns: GridColDef[] = [
    {
      field: "deliverable_name",
      headerName: "Deliverable Name",
      flex: defaultFlex,
    },
    {
      field: "start_date",
      headerName: "Start Date",
      valueFormatter: dateFormatter,
      flex: defaultFlex,
    },
    {
      field: "completion_date",
      headerName: "End Date",
      valueFormatter: dateFormatter,
      flex: defaultFlex,
    },
    { field: "deliverable_amount", headerName: "Deliverable Amount", flex: defaultFlex },
    { field: "recoverable_amount", headerName: "Recoverable Amount", flex: defaultFlex },
    { field: "fiscal", headerName: "Fiscal", flex: defaultFlex },
    {
      field: "percent_complete",
      headerName: "Percent Complete",
      valueFormatter: percentFormatter,
      flex: defaultFlex,
    },
    { field: "deliverable_status", headerName: "Deliverable Status", flex: defaultFlex },
    { field: "health_id", headerName: "Health", flex: defaultFlex },
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
