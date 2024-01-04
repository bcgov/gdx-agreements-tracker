import { GridColDef } from "@mui/x-data-grid";
import { dateFormatter } from "utils/formatDate";

export const tableConfig = () => {
  const defaultFlex = 3;
  const tableColumns: GridColDef[] = [
    {
      field: "status_date",
      headerName: "Status Date",
      valueFormatter: dateFormatter,
      flex: defaultFlex,
    },
    { field: "progress", headerName: "Progress", flex: defaultFlex },
    { field: "issues", headerName: "Issues", flex: defaultFlex },
    { field: "forecast_and_next_steps", headerName: "Forecast", flex: defaultFlex },
    { field: "risk", headerName: "Risk", flex: defaultFlex },
    { field: "schedule_health", headerName: "Schedule Health", flex: defaultFlex },
    { field: "budget_health", headerName: "Budget Health", flex: defaultFlex },
    { field: "team_health", headerName: "Team Health", flex: defaultFlex },
  ];

  const initialState = {
    filter: {
      filterModel: {
        items: [{ columnField: "status_date", operatorValue: "equals", value: "Active" }],
      },
    },
  };

  return { tableColumns, initialState };
};
