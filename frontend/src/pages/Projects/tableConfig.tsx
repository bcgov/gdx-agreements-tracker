import { GridInitialState } from "@mui/x-data-grid";
import { dateFormatter } from "utils/formatDate";

export const tableConfig = () => {
  const defaultFlex = 3;

  const tableColumns = [
    {
      field: "project_number",
      headerName: "Project Number",
      flex: defaultFlex,
    },
    { field: "project_name", headerName: "Project Name", flex: defaultFlex },
    { field: "version", headerName: "Version", flex: defaultFlex },
    { field: "portfolio_name", headerName: "Portfolio Name", flex: defaultFlex },
    { field: "project_manager", headerName: "Project Manager", flex: defaultFlex },
    {
      field: "registration_date",
      headerName: "Registration Date",
      valueFormatter: dateFormatter,
      flex: defaultFlex,
    },
    { field: "end_date", headerName: "End Date", valueFormatter: dateFormatter, flex: defaultFlex },
    { field: "status", headerName: "Status", flex: defaultFlex },
  ];

  const initialState: GridInitialState = {
    filter: {
      filterModel: {
        items: [{ field: "status", operator: "equals", value: "Active" }],
      },
    },
  };

  return { tableColumns, initialState };
};
