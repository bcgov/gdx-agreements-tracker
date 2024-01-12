import { GridColDef } from "@mui/x-data-grid";
import { dateFormatter } from "utils/formatDate";

export const tableConfig = () => {
  const largeFlex = 8;
  const defaultFlex = 4;
  const smallFlex = 2;
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
      field: "status_date",
      headerName: "Status Date",
      valueFormatter: dateFormatter,
      flex: defaultFlex,
    },
    { field: "progress", headerName: "Progress", flex: largeFlex },
    { field: "issues", headerName: "Issues", flex: defaultFlex },
    { field: "forecast_and_next_steps", headerName: "Forecast", flex: largeFlex },
    { field: "risk", headerName: "Risk", flex: smallFlex },
    {
      field: "schedule_health",
      headerName: "Schedule Health",
      flex: smallFlex,
      renderHeader: (): JSX.Element => lineBreak("Schedule", "Health"),
    },
    {
      field: "budget_health",
      headerName: "Budget Health",
      flex: smallFlex,
      renderHeader: (): JSX.Element => lineBreak("Budget", "Health"),
    },
    {
      field: "team_health",
      headerName: "Team Health",
      flex: smallFlex,
      renderHeader: (): JSX.Element => lineBreak("Team", "Health"),
    },
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
