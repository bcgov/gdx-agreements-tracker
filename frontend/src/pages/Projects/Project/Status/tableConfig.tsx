import { GridColDef, GridInitialState } from "@mui/x-data-grid";

export const tableConfig = () => {
  const defaultFlex = 3;
  const tableColumns: GridColDef[] = [
    { field: "status_date", headerName: "Status Date", flex: defaultFlex },
    { field: "progress", headerName: "Progress", flex: defaultFlex },
    { field: "issues", headerName: "Issues", flex: defaultFlex },
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
